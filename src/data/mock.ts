import { Post, Comment, User } from '../models/models';

export const currentUser: User = {
    role: 1,
    name: 'Mitya',
    image: ''
};

export const userList: User[] = [
    currentUser,
    {
        role: 2,
        name: 'Pupa',
        image: ''
    },
    {
        role: 3,
        name: 'Lupa',
        image: ''
    }
];

export const commentList: Comment[] = [
    {
        id: 1,
        postId: 1,
        user: userList[0],
        body: 'Nice!'
    },
    {
        id: 2,
        postId: 1,
        user: userList[1],
        body: 'Bruh'
    },
    {
        id: 3,
        postId: 2,
        user: userList[1],
        body: 'ahah'
    },
    {
        id: 4,
        postId: 2,
        user: currentUser,
        body: 'thx'
    }
];

export const postList: Post[] = [
    {
        id: 1,
        title: 'Shargeek Retro 35 — зарядка в виде древнего «мака»',
        body: 'Производитель аксессуаров Shargeek презентовал на краудфандинговой платформе Indiegogo новое зарядное устройство. Среди сотен тысяч аналогичных решений его выделяет необычный дизайн в виде крошечного компьютера Apple Macintosh из прошлого столетия.\n\nДальше идет пример добавления новой строки',
        image: 'https://sun7.userapi.com/sun7-9/s/v1/if2/JvgRsydyrV3tCFUR-XCUAXEz3F-QQyOvbheoj64HGP3fqfKEZwOhNrfQkSJfeWHYXgfg-rQazgjYZnKZM6AyFBol.jpg?size=400x300&quality=96&type=album',
        ts: 0,
    },
    {
        id: 2,
        title: 'Когда прекратится поддержка PS4? Ответ в новом отчёте Sony. Дальше идет пример длинного заголовка поста',
        body: 'Несмотря на то что выход консолей нового поколения состоялся полтора года назад, для большинства геймеров они до сих пор имеют статус диковинки. В связи с этим возникает логичный вопрос: как долго Sony планирует выпускать игры на PlayStation 4? Можно не переживать, время ещё есть.',
        image: 'https://sun7.userapi.com/sun7-9/s/v1/if2/fI5v14XwkQ_6XRRjY3OdTeKvLh4MkH6sHOUpWU5843zrlp-PDotfrrIjgnoRe---fcGRyifTy0yReCBEk6jbkRrr.jpg?size=400x300&quality=96&type=album',
        ts: 111,
    },
];