export const th = {
    general: {
        cancel: "ยกเลิก",
        search: "ค้นหา",
        others: "อื่นๆ",
        date: "วัน",
        month: "เดือน",
        select: "เลือก",
        refresh: "รีเฟรช",
        settings: "ตั้งค่า",
        newest: "ใหม่ล่าสุด",
        oldest: "เก่าที่สุด",
        export: "นำออก",
        save: "บันทึก",
        archive: "จัดเก็บ",
        changeStatus: "เปลี่ยนสถานะ",
        create: "สร้าง",
        edit: "แก้ไข",
        update: "อัพเดต",
        delete: "ลบ",
        uploadFile: "อัพโหลดไฟล์",
        formatOptions: "แสดงตัวเลือกการจัดรูปแบบข้อความ",
        discard: "ทิ้ง",
        discardDraft: "ทิ้งการร่าง",
        close: "ปิด",
        send: "ส่ง",
        saveAndClose: "บันทึก & ปิด",
        undo: "ย้อนกลับ",
        yes: "ใช่",
        no: "ไม่ใช่",
        admin: "ผู้ดูแลระบบ",
        Anonymous: "ไม่ระบุ",
        download: "ดาวน์โหลด",
        present: "ปัจจุบัน",
        start: "เริ่มต้น",
        end: "สิ้นสุด",
        exceed: "เกิน",
        duration: "ระยะเวลา",
        unit: "หน่วย"
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
            }
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
                group: "ผ่าย",
                subGroup: "กอง",
                groupAndSubGroup: "ฝ่าย & กอง"
            }
        }
    },
    sidebar: {
        inbox: "กล่องข้อร้องเรียน",
        draft: "กำลังร่าง",
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
    alertMessages: {
        undo: "Action undone",
        searchComplaint: {
            invalidQuery: "การค้นหาไม่สมบูรณ์ ระบบจะแสดงข้อร้องเรียนทั้งหมด",
            error: "การค้นหาผิดพลาด กรุณาลองใหม่อีกครั้ง"
        },
        file: {
            delete_success: "Attachment was deleted successfully",
            delete_error: "Cannot delete file, please try again"
        },
        uploadFile: {
            delete_success: "Uploaded file was deleted successfully"
        },
        complaintForm: {
            submit_error: "Cannot submit complaint, please check error message",
            delete_error: "Cannot delete complaint, please try again",
            archive_error: "Cannot archive complaint, please try again",
            create_success: "Complaint was created successfully",
            update_success: "Complaint was updated successfully",
            delete_success: "Complaint moved to Trash",
            archive_success: "Complaint moved to Archive"
        },
        complaintStatus: {
            update_success: "Complaint Status was updated successfully",
            update_error: "Cannot update complaint status, please try again",
        },
        complaintNote: {
            submit_error: "Cannot submit note, please check error message",
            delete_error: "Cannot delete note, please try again",
            create_success: "Note was created successfully",
            update_success: "Note was updated successfully",
            delete_success: "Note was deleted successfully"
        },
        issueCategory: {
            submit_error: "Cannot submit category, please check error message",
            edit_error: "Cannot load category data, please try again",
            delete_error: "Cannot delete category, please try again",
            create_success: "Category was created successfully",
            update_success: "Category was updated successfully",
            delete_success: "Category was deleted successfully"
        },
        issueStatus: {
            submit_error: "Cannot submit status, please check error message",
            edit_error: "Cannot load status data, please try again",
            delete_error: "Cannot delete status, please try again",
            create_success: "Status was created successfully",
            update_success: "Status was updated successfully",
            delete_success: "Status was deleted successfully"
        },
        userGroup: {
            submit_error: "Cannot submit user, please check error message",
            edit_error: "Cannot load user data, please try again",
            delete_error: "Cannot delete user, please try again",
            create_success: "User was created successfully",
            update_success: "User was updated successfully",
            delete_success: "User was deleted successfully"
        },
    },
    table: {
        noData: "ไม่พบข้อมูล",
        noResult: "ไม่พบผลการค้นหา"
    }
};
