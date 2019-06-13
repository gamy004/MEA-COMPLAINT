<?php

namespace App\Api;

use App\IOCs\DBCol;
use App\Api\BaseApi;
use App\Models\Group;
use Illuminate\Http\Request;
use App\Models\AttributeType;
use App\Contracts\ApiInterface;
use Illuminate\Database\Eloquent\Model;

class AttributeTypeApi extends BaseApi implements ApiInterface
{

    public function __construct(AttributeType $q)
    {
        parent::__construct($q);
    }

    public function index()
    {
        return $this->setCustomQuery(
            $this->queryIndex()
        )->get();
    }

    private function queryIndex()
    {
        $baseTable = model_table(AttributeType::class);
        $groupTable = model_table(Group::class);

        return $this->getOriginalModel()
            ->join(
                $groupTable,
                sprintf("%s.%s", $baseTable, Group::FK),
                "=",
                sprintf("%s.%s", $groupTable, DBCol::ID)
            )->select(
            [
                sprintf("%s.%s", $baseTable, DBCol::ID),
                sprintf("%s.%s", $baseTable, DBCol::NAME),
                sprintf("%s.%s as type", $groupTable, DBCol::NAME)
            ]
        );
    }

    public function store(array $raw)
    {

    }

    public function update(Model $user, array $raw)
    {

    }

    public function destroy(Model $attributeType)
    {

    }
}
