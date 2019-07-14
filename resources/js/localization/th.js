export const th = {
    general: {
        cancel: "ยกเลิก",
        search: "ค้นหา",
        others: "อื่นๆ",
        date: "วัน",
        month: "เดือน",
        select: "เลือก",
        refresh: "รีเฟรช",
        restore: "นำกลับมา",
        settings: "ตั้งค่า",
        newest: "ใหม่ล่าสุด",
        oldest: "เก่าที่สุด",
        export: "นำออก",
        save: "บันทึก",
        savingDraft: "กำลังบันทึกแบบร่าง",
        archive: "จัดเก็บ",
        changeStatus: "เปลี่ยนสถานะ",
        create: "สร้าง",
        edit: "แก้ไข",
        update: "อัพเดต",
        delete: "ลบ",
        forceDelete: "ลบออกจากระบบ",
        moveToTrash: "ย้ายไปหน้าลบทิ้ง",
        uploadFile: "อัพโหลดไฟล์",
        formatOptions: "แสดงตัวเลือกการจัดรูปแบบข้อความ",
        discard: "ทิ้ง",
        discardDraft: "ทิ้งร่างข้อร้องเรียน",
        close: "ปิด",
        send: "ส่ง",
        saveAndClose: "บันทึก & ปิด",
        undo: "คืนค่า",
        yes: "ใช่",
        no: "ไม่ใช่",
        admin: "ผู้ดูแลระบบ",
        anonymous: "ไม่ระบุ",
        anonymousRecipient: "ไม่ระบุผู้รับข้อร้องเรียน",
        anonymousStatus: "ไม่ระบุสถานะ",
        download: "ดาวน์โหลด",
        present: "ปัจจุบัน",
        start: "เริ่มต้น",
        end: "สิ้นสุด",
        exceed: "เกิน",
        duration: "ระยะเวลา",
        unit: "หน่วย",
        logout: "ออกจากระบบ"
    },
    time: {
        minutes: "นาที",
        hours: "ชั่วโมง",
        days: "วัน",
        weeks: "สัปดาห์",
        months: "เดือน",
        years: "ปี"
    },
    complaint: {
        addBtn: "สร้างข้อร้องเรียน",
        index: {
            toolbar: {
                generateReport: {
                    tooltip: "นำออกรายงานข้อร้องเรียน",
                    subheader: "นำออกรายงาน",
                    dateheader: "นำออกโดย",
                    by: {
                        selected: "ที่กำลังเลือกขณะนี้",
                        filter: "ผลการค้นหาขณะนี้",
                        thisWeek: "สัปดาห์นี้",
                        thisMonth: "เดือนนี้",
                        date: "เลือกวัน"
                    },
                    watingTerm: "กำลังนำออกรายงานข้อร้องเรียน โปรดรอสักครู่"
                },
                inboxConfigs: {
                    tooltip: "แสดงการตั้งค่ากล่องข้อความ",
                    header: "ตั้งค่ากล่องข้อร้องเรียน",
                    maxPage: "ข้อความมากสุดต่อหน้า"
                },
                primary: "ข้อร้องเรียนหลัก"
            },
            selectAllSearch: {
                someSelected: "<strong>{count}</strong> ข้อร้องเรียนถูกเลือก",
                allSelected: "ข้อร้องเรียนทั้งหมด <strong>{count}</strong> ถูกเลือก",
                selectAllBtn: "เลือกข้อร้องเรียนทั้งหมดที่ตรงกับการค้นหานี้",
                clearAll: "ยกเลิกการเลือกทั้งหมด"
            },
            form: {
                title: "ข้อร้องเรียน",
                category: "ประเภท",
                to: "ถึง",
                subject: "หัวข้อ",
                fullScreen: "โหมดเต็มหน้าจอ",
                warningDiscard: {
                    title: "ทิ้งการร่างข้อร้องเรียน?",
                    desc: "การร่างข้อร้องเรียนของคุณจะถูกลบอย่างถาวร"
                },
                warningSubmit: {
                    title: "ส่งข้อร้องเรียนโดยไม่มีหัวข้อและคำอธิบาย?",
                    desc: "คุณต้องการส่งข้อร้องเรียนโดยไม่มีหัวข้อและคำอธิบาย"
                },
                warningForceDelete: {
                    title: "ลบข้อร้องเรียน?",
                    desc: "ข้อร้องเรียนนี้จะถูกลบออกจากระบบอย่างถาวร"
                }
            }
        },
        show: {
            toolbar: {
                back: "กลับสู่กล่องข้อร้องเรียน",
                showStatusHistory: "แสดงประวัติการเปลี่ยนแปลงสถานะ"
            },
            statusHistory: {
                title: "ประวัติการเปลี่ยนแปลงสถานะ"
            },
            complaintNote: {
                remarkBy: "ให้ความเห็นโดย",
                to: "ถึง"
            },
            remarkBtn: "เพิ่มความเห็น"
        }
    },
    issueCategory: {
        index: {
            title: "ประเภทข้อร้องเรียน",
            searchLabel: "ค้นหาประเภทข้อร้องเรียน",
            createBtn: "สร้างประเภทข้อร้องเรียน",
            header: {
                category: "ประเภทข้อร้องเรียน"
            },
            form: {
                title: {
                    new: "สร้างประเภทข้อร้องเรียน",
                    update: "แก้ไขประเภทข้อร้องเรียน"
                },
                name: "ชื่อประเภท"
            }
        }
    },
    issueStatus: {
        index: {
            title: "สถานะข้อร้องเรียน",
            searchLabel: "ค้นหาสถานะข้อร้องเรียน",
            createBtn: "สร้างสถานะข้อร้องเรียน",
            header: {
                status: "สถานะข้อร้องเรียน"
            },
            form: {
                title: {
                    new: "สร้างสถานะข้อร้องเรียน",
                    update: "แก้ไขสถานะข้อร้องเรียน"
                },
                name: "ชื่อสถานะ",
                pickColor: "เลือกสีสถานะ",
                trackStatus: "ติดตามสถานะ",
                subPickColor: "เลือกสีสถานะสำหรับการติดลำดับที่ {n}",
                addTracking: "เพิ่มการติดตามสถานะ"
            }
        }
    },
    userGroup: {
        index: {
            title: "ผู้ใช้งานและกลุ่มผู้ใช้งาน",
            searchLabel: "ค้นหาผู้ใช้งาน หรือ กลุ่มผู้ใช้งาน",
            createBtn: "สร้างผู้ใช้งาน",
            header: {
                user: "ผู้ใช้งาน",
                role: "สิทธิการใช้งาน",
                group: "ฝ่าย",
                subGroup: "กอง"
            },
            form: {
                title: {
                    new: "สร้างผู้ใช้งาน",
                    update: "แก้ไขผู้ใช้งาน"
                },
                credential: "ข้อมูลบัญชีผู้ใช้งาน",
                username: "บัญชีผู้ใช้งาน (จำเป็นต้องกรอก)",
                updatePassword: "อัพเดตรหัสผ่าน",
                password: "รหัสผ่าน (จำเป็นต้องกรอก)",
                passwordConfirm: "ยืนยันรหัสผ่าน (จำเป็นต้องกรอก)",
                generalInformation: "ข้อมูลทั่วไป",
                name: "ชื่อ (จำเป็นต้องกรอก)",
                email: "อีเมล์",
                phone: "เบอร์โทรศัพท์",
                role: "สิทธิการใช้งาน",
                group: "ฝ่าย",
                subGroup: "กอง",
                groupAndSubGroup: "ฝ่าย & กอง"
            },
            warningGroupItem: {
                term: "{item} จะถูกลบออกจากระบบอย่างถาวร ผู้ใช้งานภายใต้ {item} จะสูญเสียกอง/ฝ่ายของตนเอง"
            }
        }
    },
    sidebar: {
        inbox: "กล่องข้อร้องเรียน",
        draft: "ร่างข้อร้องเรียน",
        archive: "จัดเก็บ",
        trash: "ลบทิ้ง",
        adminSection: "ส่วนจัดการสำหรับผู้ดูแลระบบ",
        categories: "ประเภทข้อร้องเรียน",
        statuses: "สถานะข้อร้องเรียน",
        usersAndGroups: "ผู้ใช้งานและกลุ่มผู้ใช้งาน",
    },
    header: {
        searchLabel: "ค้นหาข้อร้องเรียน",
        searchTooltip: "แสดงตัวเลือกการค้นหา",
        searchClearAction: "ล้างการค้นหา",
        searchForm: {
            from: "ผู้เปิดข้อร้องเรียน",
            to: "ผู้รับข้อร้องเรียน",
            status: "สถานะ",
            category: "ประเภท",
            subject: "หัวข้อ",
            includeWords: "มีคำ",
            excludeWords: "ไม่มีคำ",
            selectBy: {
                date: "เปลี่ยนเป็นเลือกโดยวัน",
                month: "เปลียนเป็นเลือกโดยเดือน",
            }
        }
    },
    login: {
        term1: "ยินดีต้อนรับ",
        signIn: "เข้าสู่ระบบ",
        signInTerm: "ด้วยบัญชีผู้ใช้งานจาก MEA",
        form: {
            username: "บัญชีผู้ใช้งาน",
            password: "รหัสผ่าน"
        },
        signin_success: "เข้าสู่ระบบสำเร็จ"
    },
    alertMessages: {
        undo: "คืนค่าเรียบร้อยแล้ว",
        undo_error: "คืนค่าไม่สำเร็จ",
        update_success: "แก้ไขเรียบร้อยแล้ว",
        update_error: "แก้ไขไม่สำเร็จ",
        delete_success: "ลบเรียบร้อยแล้ว",
        delete_error: "ลบไม่สำเร็จ",
        searchComplaint: {
            invalidQuery: "การค้นหาไม่สมบูรณ์ ระบบจะแสดงข้อร้องเรียนทั้งหมด",
            error: "ค้นหาไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
        },
        file: {
            delete_success: "ไฟล์ถูกลบเรียบร้อยแล้ว",
            delete_error: "ลบไฟล์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
        },
        uploadFile: {
            delete_success: "ไฟล์ที่ทำการอัพโหลดถูกลบเรียบร้อยแล้ว"
        },
        complaintForm: {
            submit_error: "บันทึกข้อมูลข้อร้องเรียนไม่สำเร็จ โปรดตรวจสอบข้อผิดพลาด",
            delete_error: "ลบข้อร้องเรียนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
            archive_error: "จัดเก็บข้อร้องเรียนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
            save_draft_success: "บันทึกร่างข้อร้องเรียนเรียบร้อยแล้ว",
            create_success: "สร้างข้อร้องเรียนเรียบร้อยแล้ว",
            update_success: "แก้ไขข้อร้องเรียนเรียบร้อยแล้ว",
            delete_success: "ข้อร้องเรียนถูกย้ายไปหน้าลบทิ้งเรียบร้อยแล้ว",
            archive_success: "ข้อร้องเรียนถูกย้ายไปหน้าจัดเก็บเรียบร้อยแล้ว",
            restore_success: "ข้อร้องเรียนถูกนำกลับมาเรียบร้อยแล้ว",
            force_delete_success: "ข้อร้องเรียนถูกลบเรียบร้อยแล้ว"
        },
        complaintStatus: {
            update_success: "อัพเดตสถานะข้อร้องเรียนเรียบร้อยแล้ว",
            update_error: "อัพเดตสถานะข้อร้องเรียนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
        },
        complaintNote: {
            submit_error: "บันทึกข้อมูลข้อคิดเห็นไม่สำเร็จ โปรดตรวจสอบข้อผิดพลาด",
            delete_error: "ลบข้อคิดเห็นไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
            create_success: "สร้างข้อคิดเห็นเรียบร้อยแล้ว",
            update_success: "แก้ไขข้อคิดเห็นเรียบร้อยแล้ว",
            delete_success: "ลบข้อคิดเห็นเรียบร้อยแล้ว"
        },
        issueCategory: {
            submit_error: "บันทึกข้อมูลประเภทข้อร้องเรียนไม่สำเร็จ โปรดตรวจสอบข้อผิดพลาด",
            edit_error: "โหลดข้อมูลประเภทข้อร้องเรียนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
            delete_error: "ลบประเภทข้อร้องเรียนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
            create_success: "สร้างประเภทข้อร้องเรียนเรียบร้อยแล้ว",
            update_success: "แก้ไขประเภทข้อร้องเรียนเรียบร้อยแล้ว",
            delete_success: "ลบประเภทข้อร้องเรียนเรียบร้อยแล้ว"
        },
        issueStatus: {
            submit_error: "บันทึกข้อมูลสถานะข้อร้องเรียนไม่สำเร็จ โปรดตรวจสอบข้อผิดพลาด",
            edit_error: "โหลดข้อมูลสถานะข้อร้องเรียนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
            delete_error: "ลบข้อมูลสถานะข้อร้องเรียนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
            create_success: "สร้างสถานะข้อร้องเรียนเรียบร้อยแล้ว",
            update_success: "แก้ไขสถานะข้อร้องเรียนเรียบร้อยแล้ว",
            delete_success: "ลบสถานะข้อร้องเรียนเรียบร้อยแล้ว",
            update_default_success: "เปลี่ยนสถานะเริ่มต้นเรียบร้อยแล้ว",
            update_default_error: "เปลี่ยนสถานะเริ่มต้นไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
        },
        userGroup: {
            submit_error: "บันทึกข้อมูลผู้ใช้งานไม่สำเร็จ โปรดตรวจสอบข้อผิดพลาด",
            edit_error: "โหลดข้อมูลผู้ใช้งานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
            delete_error: "ลบข้อมูลผู้ใช้งานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
            create_success: "สร้างผู้ใช้งานเรียบร้อยแล้ว",
            update_success: "แก้ไขผู้ใช้งานเรียบร้อยแล้ว",
            delete_success: "ลบผู้ใช้งานเรียบร้อยแล้ว"
        },
        group: {
            update_success: "แก้ไขฝ่ายเรียบร้อยแล้ว",
            update_error: "แก้ไขฝ่ายไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
            delete_success: "ลบฝ่ายเรียบร้อยแล้ว",
            delete_error: "ลบฝ่ายไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
        },
        subgroup: {
            update_success: "แก้ไขกองเรียบร้อยแล้ว",
            update_error: "แก้ไขกองไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
            delete_success: "ลบกองเรียบร้อยแล้ว",
            delete_error: "ลบกองไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
        }
    },
    table: {
        noData: "ไม่พบข้อมูล",
        noResult: "ไม่พบผลการค้นหา"
    }
};
