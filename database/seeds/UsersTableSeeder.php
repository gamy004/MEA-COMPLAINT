<?php

use App\Models\Role;
use App\Models\User;
use App\Models\Group;
use App\Models\Issue;
use App\Models\IssueNote;
use App\Models\IssueStatus;
use Illuminate\Support\Arr;
use App\Models\IssueCategory;
use App\Models\IssueRecipient;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();

        Group::truncate();
        IssueRecipient::truncate();
        User::truncate();
        Issue::truncate();

        $issue_statuses = IssueStatus::all();
        $issue_categories = IssueCategory::all();

        $roles = Role::all()->each(
            function($r) use ($issue_statuses, $issue_categories) {
                $user_ids = [];

                $group_ids = [null];

                if ($r->role !== 'admin') {
                    $group_ids = factory(Group::class, 5)
                        ->create()
                        ->pluck('id')
                        ->toArray();
                }

                $i = 1;

                foreach ($group_ids as $group_id) {
                    // loop user
                    for ($j=1; $j <= 10; $j++) {
                        $username = $r->role.$i;
                        $password = Hash::make($username.'password');

                        $user = factory(User::class)
                            ->create(
                                compact('username', 'password', 'group_id')
                            );

                        array_push($user_ids, $user->id);

                        unset($user);

                        $i += 1;
                    }
                }

                // loop issue
                foreach ($group_ids as $group_index => $issued_by) {
                    if (is_null($issued_by)) {
                        continue;
                    }

                    $other_group_ids = Arr::except($group_ids, $group_index);

                    foreach ($issue_statuses as $status_index => $issue_status) {
                        $issue_status_id = $issue_status->id;

                        for ($j=1; $j <= 10; $j++) {
                            $referenced_to = null;
                            $rand_category = $issue_categories->random();
                            $issue_category_id = $rand_category->id;

                            $issue = factory(Issue::class)
                                ->create(
                                    compact(
                                        'issued_by',
                                        'referenced_to',
                                        'issue_status_id',
                                        'issue_category_id'
                                    )
                                );

                            $random_recipients = Arr::random(
                                $other_group_ids,
                                rand(1, count($other_group_ids))
                            );

                            $notes = factory(IssueNote::class, 3)
                                ->create([
                                    'issue_id' => $issue->id,
                                    'created_by' => head($random_recipients)
                                ]);

                            $issue->recipients()->sync($random_recipients);

                            $rand_is_referenced_to = rand(0, 1);

                            // if ($rand_is_referenced_to) {
                            //     $referenced_to = $issue->id;
                            //     $referenced_issued_by = Arr::random($random_recipients);

                            //     $referenced_issue = factory(Issue::class)
                            //         ->create([
                            //             'subject' => "Re: ".$issue->subject,
                            //             'issued_by' => $referenced_issued_by,
                            //             'referenced_to' => $referenced_to,
                            //             'issue_status_id' => $issue_status_id,
                            //             'issue_category_id' => $issue_category_id
                            //         ]);

                            //     $referenced_recipients = Arr::except(
                            //         $random_recipients,
                            //         $referenced_issued_by
                            //     );

                            //     $result = $referenced_issue->recipients()->sync(array_merge(
                            //         [$issued_by],
                            //         Arr::random(
                            //             $referenced_recipients,
                            //             rand(1, count($referenced_recipients))
                            //         )
                            //     ));
                            // }
                        }
                    }
                }


                $r->users()->sync($user_ids);
            }
        );
    }
}
