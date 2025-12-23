import { Tier } from "./utils";

export const INTRO_CAPTIONS = [
    "Ảnh này nhìn hơi bị uy tín nha 😼",
    "Góc này thì giám khảo cũng phải respect",
    "Tấm này vibe 'học bá' hơi bị rõ",
    // "Đừng nhìn nữa, anh biết em đẹp rồi",
    "Thi xong nhớ đi chụp bộ ảnh như vầy",
    "Visual này là điểm cộng trước khi thi",
    "Không đùa đâu, tấm này đỉnh ✨",
    "Mood: tự tin, không panic",
    "Giao diện chuẩn bị thi, hệ điều hành hơi lag?",
    "Flex nhẹ chiếc ảnh trước giờ G",
    "Nhìn là biết nay trúng tủ rồi",
    "Gương mặt vàng trong làng sĩ tử",
    "Thôi nha, đừng có mà xinh quá mức",
    "Ảnh này mang đi thi là auto điểm cao"
];

// export const INTRO_BUBBLES = [
//     "Đừng suy nghĩ nhiều, não cần nghỉ ngơi.",
//     "Vào phòng thi bật mode 'người máy' nha.",
//     "Gặp câu khó thì skip liền, đừng đứng hình 5s 😭",
//     "Đọc đề 2 lần cho chắc kèo.",
//     "Dễ trước – khó sau, chơi vậy mới khôn.",
//     "Kệ người ta thở dài, em làm em.",
//     "Canh thời gian, đừng all-in 1 câu.",
//     "Uống miếng nước, reset cái đầu.",
//     "Bình tĩnh là auto đẹp.",
//     "Não không lag hôm nay nha.",
//     "Thi xong nhắn 'done' là được.",
//     "Đừng tự dọa mình, đề cũng chỉ là đề."
// ];

export const SCAN_SUBTITLES = [
    "Đang quét độ tự tin...",
    "Đang check nhân phẩm...",
    "Đang tải dữ liệu 'trúng tủ'...",
    "Đang phân tích chỉ số may mắn...",
    "Kết nối với vũ trụ...",
    "Đang lọc bớt năng lượng tiêu cực...",
    "Đang bật mode 'chiến thần'...",
    "Đang dò tìm kiến thức cũ...",
    "Đang buff 100% công lực...",
    "Đang sync não với đề thi..."
];

export const TIPS = [
    "Gặp câu khó thì skip liền, đừng đứng hình 5s.",
    "Đọc đề 2 lần, đừng để đề lừa mình.",
    "Mang dư bút, đừng để lúc cần lại tịt ngòi.",
    "Uống ít nước thôi, đỡ chạy đi vệ sinh 🤣",
    "Tô trắc nghiệm cho tròn, đừng nghệ thuật quá.",
    "Đừng nhìn bài bạn, nó cũng đang loạn lắm.",
    "Cuối giờ nhớ check lại tên, SBD nha.",
    "Thở sâu 3 cái nếu thấy tim đập nhanh.",
    "Tắt điện thoại, tháo đồng hồ thông minh!",
    "Tin vào trực giác, câu đầu tiên thường đúng."
];

export const RESULT_HEADLINES: Record<Tier, string[]> = {
    legend: [
        "Huyền thoại xuất trận. Đề thi xin phép luôn 👑",
        "Gì vậy trời? Aura này là 'chiến thần' rồi!",
        "Đỉnh nóc, kịch trần, bay phấp phới! 😎",
        "Tầm này thì giám khảo cũng phải vỗ tay",
        "Không nói nhiều, 10 điểm về chỗ!",
        "Em là ai? Sao hào quang chói quá vậy?",
        "Mode này là mode 'hủy diệt' đề thi",
        "Chấn động! Sĩ tử này out trình!"
    ],
    peak: [
        "Đỉnh rồi đó. Kiểu này giám khảo phải gật gù 😎",
        "Aura này rất sáng, năng lượng rất cao ✨",
        "Chuẩn vibe 'con nhà người ta' rồi",
        "Phong độ này là auto điểm tốt",
        "Quá ổn áp, tự tin bước vào phòng thi",
        "Trạng thái này là bá cháy bọ chét",
        "Nhìn chỉ số là biết nay làm bài mượt",
        "Sẵn sàng chưa? Phong thái này là ăn chắc"
    ],
    good: [
        "Ngon rồi. Bình tĩnh làm bài là ăn chắc 😌",
        "Không tệ nha, giữ cái đầu lạnh là win",
        "Phong độ ổn định, không flex nhưng chắc chắn",
        "Chỉ số an toàn cao, cứ thế mà làm",
        "Trạng thái tốt, đừng để bị tâm lý là được",
        "Cứ thong thả, chậm mà chắc nha",
        "Vừa đủ đẹp để vượt qua mọi thử thách",
        "Tâm thế thoải mái, kết quả sẽ như ý"
    ],
    ok: [
        "Ổn áp. Mình làm chậm mà chắc là vẫn đẹp điểm ✨",
        "Hơi run nhẹ đúng không? Thở sâu đi nào",
        "Không sao, quan trọng là thần thái",
        "Cố gắng hết sức là được, đừng áp lực",
        "Cẩn thận xíu là qua ải ngon lành",
        "Tuy hơi lo nhưng vận may vẫn bên em",
        "Mọi chuyện sẽ ổn thôi, tin vào tổ tiên gánh",
        "Bình tĩnh tự tin, đừng panic là được"
    ]
};

export const RESULT_CLOSINGS: Record<Tier, string[]> = {
    legend: [
        "Thi xong nhớ nhắn anh 1 câu 'easy game' nha 🎉",
        "Tầm này đề thi chỉ là NPC thôi, em mới là main.",
        "Giữ phong độ này, vào phòng thi là tỏa sáng.",
        "Không cần chúc may mắn nữa, em là may mắn rồi.",
        "Đi thi về nhớ khao anh chầu trà sữa nha.",
        "Quá dữ! Đi thi nhớ nhẹ tay kẻo đề khóc.",
        "Anh chờ tin vui chấn động từ em.",
        "Cứ thế mà diễn, sân khấu hôm nay là của em.",
        "Tự tin lên, điểm cao là trong tầm tay.",
        "Respect! Em đã chuẩn bị quá tốt."
    ],
    peak: [
        "Em làm được mà. Thi xong về kể anh nghe 😌",
        "Cứ bình tĩnh làm bài nha :)))",
        "Bảo toàn năng lượng, vào thi bung lụa nhé.",
        "Tin tưởng vào bản thân, mọi nỗ lực sẽ được đền đáp.",
        "Giữ vibe này nhé, đừng để ai làm phiền.",
        "Anh tin em làm được, 100% công lực!",
        "Đừng quên mang theo sự tự tin này vào phòng thi.",
        "Mọi thứ đã sẵn sàng, chỉ chờ em tỏa sáng."
    ],
    good: [
        "Cứ theo nhịp của em, đừng vội. Em thi tốt nha 💖",
        "Gặp câu khó thì skip liền, đừng sa lầy.",
        "Làm bài cẩn thận, nhớ check lại đáp án.",
        "Cố lên, thi xong mình đi ăn ngon.",
        "Giữ tinh thần thoải mái, đừng tự áp lực.",
        "Vạn sự tùy duyên, nhưng nhớ học bài kỹ xíu 🤣",
        "May mắn sẽ mỉm cười với người chăm chỉ (là em đó).",
        "Thi tốt nha, anh chờ tin em.",
        "Bình tĩnh, tự tin, chiến thắng!"
    ],
    ok: [
        "Quan trọng là mình đã cố gắng hết sức.",
        "Đừng để tâm lý ảnh hưởng, cứ làm hết mình.",
        "Thi cử chỉ là một trải nghiệm, chill thôi.",
        "Vượt qua chính mình là chiến thắng rồi.",
        "Cố lên, còn thở là còn gỡ (đùa thôi, làm tốt mà).",
        "Anh biết em đang lo, nhưng mọi thứ sẽ ổn.",
        "Cứ bước vào phòng thi với nụ cười trên môi.",
        "Thi xong là xõa, kết quả tính sau ha!"
    ]
};

export type ReasonDef = {
    label: string;
    min: number;
    max: number;
    w: number;
    tags?: string[];
    hidden?: boolean;
};

export const REASON_BANK: ReasonDef[] = [
    { label: "Ăn sáng đầy đủ", min: 8, max: 15, w: 8, tags: ["health"] },
    { label: "Ngủ đủ giấc", min: 10, max: 20, w: 9, tags: ["health"] },
    { label: "Tâm lý vững vàng", min: 12, max: 22, w: 8, tags: ["mind"] },
    { label: "Không panic", min: 10, max: 18, w: 7, tags: ["mind"] },
    { label: "Não không lag", min: 10, max: 20, w: 8, tags: ["mind"] },
    { label: "Né bẫy câu lừa", min: 12, max: 20, w: 9, tags: ["skill"] },
    { label: "Đọc đề 2 lần", min: 8, max: 16, w: 9, tags: ["skill"] },
    { label: "Canh thời gian chuẩn", min: 8, max: 15, w: 8, tags: ["skill"] },
    { label: "Tô trắc nghiệm nhanh", min: 6, max: 12, w: 6, tags: ["skill"] },
    { label: "Chọn đáp án dứt khoát", min: 7, max: 14, w: 7, tags: ["skill"] },
    { label: "Gặp dạng quen", min: 15, max: 25, w: 6, tags: ["luck"] },
    { label: "Trúng tủ đúng chương", min: 20, max: 30, w: 4, tags: ["luck"] },
    { label: "May mắn nhẹ", min: 5, max: 10, w: 5, tags: ["luck"] },
    { label: "Vũ trụ gửi tín hiệu", min: 8, max: 18, w: 5, tags: ["luck"] },
    { label: "Giám khảo dễ tính", min: 5, max: 10, w: 4, tags: ["luck"] },
    { label: "Bút không tắc mực", min: 2, max: 5, w: 6, tags: ["luck"] },
    { label: "Phòng thi mát mẻ", min: 3, max: 8, w: 5, tags: ["luck"] },
    { label: "Tự tin đúng lúc", min: 10, max: 20, w: 7, tags: ["mind"] },
    { label: "Flex nhẹ kiến thức", min: 5, max: 15, w: 5, tags: ["mind"] },
    { label: "Auto qua liệt", min: 5, max: 10, w: 6, tags: ["skill"] },
    { label: "Skip câu khó", min: 8, max: 15, w: 7, tags: ["skill"] },
    { label: "Trí nhớ siêu phàm", min: 15, max: 25, w: 5, tags: ["skill"] },
    { label: "Soi đề như Conan", min: 10, max: 20, w: 6, tags: ["skill"] },
    { label: "Tay nhanh hơn não (tốt)", min: 5, max: 12, w: 4, tags: ["skill"] },
    { label: "Độ xinh gái", min: 1, max: 5, w: 3, tags: ["luck"] },
    { label: "Tổ tiên gánh còng lưng", min: 10, max: 30, w: 3, tags: ["luck"] },
    { label: "Nhân phẩm cực tốt", min: 8, max: 16, w: 5, tags: ["luck"] },
    { label: "Sức khỏe trâu bò", min: 10, max: 20, w: 6, tags: ["health"] },
    { label: "Buff cổ vũ (bí mật)", min: 999, max: 999, w: 0, hidden: true } // Special handling
];

// Helpers
export function pickN<T>(arr: T[], n: number): T[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

export function pickOne<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}
