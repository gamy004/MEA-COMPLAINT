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
        save: "บันทึก"
    },

    complaint: {
        addBtn: "เพื่มข้อร้องเรียน",

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
                    }
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
        searchComplaint: {
            invalidQuery: "การค้นหาไม่สมบูรณ์ ระบบจะแสดงข้อเรียนทั้งหมด",
            error: "การค้นหาผิดพลาด กรุณาลองใหม่อีกครั้ง"
        }
    }
};
