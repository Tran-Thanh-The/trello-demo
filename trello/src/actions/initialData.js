export const initialData = {
  boards: [
    {
      id: 'board-1',
      columnOrder: ['column-1', 'column-2', 'column-3'],
      columns: [
        {
          id: 'column-1',
          boardId: 'board-1',
          title: 'todo list',
          cardOrder: ['card-1', 'card-2', 'card-3'],

          cards: [
            {
              id: 'card-1',
              columnId: 'column-1',
              boardId: 'board-1',
              title: 'công việc 1',
              cover: 'https://64.media.tumblr.com/4e89bd8671866e75ef3aef3a14100aaf/tumblr_nt2giouyg11qbd81ro1_1280.jpg'
            },
            {
              id: 'card-2',
              columnId: 'column-1',
              boardId: 'board-1',
              title: 'công việc 2',
              cover: null
            },
            {
              id: 'card-3',
              columnId: 'column-1',
              boardId: 'board-1',
              title: 'công việc 3',
              cover: null
            }
          ]
        },
        {
          id: 'column-2',
          boardId: 'board-1',
          title: 'column 2',
          cardOrder: ['card-4', 'card-5', 'card-6'],

          cards: [
            {
              id: 'card-4',
              columnId: 'column-2',
              boardId: 'board-1',
              title: 'công việc 1',
              cover: null
            },
            {
              id: 'card-5',
              columnId: 'column-2',
              boardId: 'board-1',
              title: 'công việc 2',
              cover: null
            },
            {
              id: 'card-6',
              columnId: 'column-2',
              boardId: 'board-1',
              title: 'công việc 3',
              cover: null
            }
          ]
        },
        {
          id: 'column-3',
          boardId: 'board-1',
          title: 'column 3',
          cardOrder: ['card-7', 'card-8', 'card-9'],

          cards: [
            {
              id: 'card-7',
              columnId: 'column-3',
              boardId: 'board-1',
              title: 'công việc 1',
              cover: null
            },
            {
              id: 'card-8',
              columnId: 'column-3',
              boardId: 'board-1',
              title: 'công việc 2',
              cover: null
            },
            {
              id: 'card-9',
              columnId: 'column-3',
              boardId: 'board-1',
              title: 'công việc 3',
              cover: null
            }
          ]
        }
      ]
    }
  ]
}