import type { INodeApi } from '@/types/INodeApi';
import type { INodeMainRubric } from '@/types/INodeMainRubric';

const IMAGE_BASE_URL = 'https://lipsum.app/id';
const IMAGE_WIDTH = 1600;
const IMAGE_HEIGHT = 900;
const IMAGE_ID_MIN = 1;
const IMAGE_ID_MAX = 99;

const getImageSrc = (seed: string): string => {
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }

  const imageId = (hash % IMAGE_ID_MAX) + IMAGE_ID_MIN;

  return `${IMAGE_BASE_URL}/${imageId}/${IMAGE_WIDTH}x${IMAGE_HEIGHT}`;
};

export const MOCK_RUBRIC_DEFINITIONS = [
  { id: 'rubric-concept', name: 'Понятие' },
  { id: 'rubric-people', name: 'Люди' },
  { id: 'rubric-events', name: 'События' },
  { id: 'rubric-services', name: 'Услуги' },
  { id: 'rubric-goods', name: 'Товары' },
  { id: 'rubric-brands', name: 'Фирмы, бренды' },
  { id: 'rubric-tourism', name: 'Места, туризм' },
  { id: 'rubric-hobby', name: 'Желания, хобби' },
] as const;

type TRubricChildNames = Record<string, readonly [string, string]>;

interface ISlideDefinition {
  id: string;
  name: string;
  childNames: TRubricChildNames;
}

const SLIDE_DEFINITIONS: ISlideDefinition[] = [
  {
    id: 'slide-1',
    name: 'Иван Петров',
    childNames: {
      'rubric-concept': ['Биография', 'Характер'],
      'rubric-people': ['Анна Петрова', 'Сергей Орлов'],
      'rubric-events': ['День рождения', 'Первая работа'],
      'rubric-services': ['Консультация', 'Помощь проекту'],
      'rubric-goods': ['Портфель', 'Блокнот'],
      'rubric-brands': ['Петров и Ко', 'Личный бренд'],
      'rubric-tourism': ['Санкт-Петербург', 'Карелия'],
      'rubric-hobby': ['Шахматы', 'Гитара'],
    },
  },
  {
    id: 'slide-2',
    name: 'Елена Смирнова',
    childNames: {
      'rubric-concept': ['Портрет', 'Принципы'],
      'rubric-people': ['Мария Смирнова', 'Павел Ким'],
      'rubric-events': ['Выставка', 'Деловая встреча'],
      'rubric-services': ['Фотосессия', 'Наставничество'],
      'rubric-goods': ['Камера', 'Платье'],
      'rubric-brands': ['Смирнова Студия', 'Ателье «Линия»'],
      'rubric-tourism': ['Тбилиси', 'Сочи'],
      'rubric-hobby': ['Танцы', 'Керамика'],
    },
  },
  {
    id: 'slide-3',
    name: 'Музей истории',
    childNames: {
      'rubric-concept': ['Экспозиция', 'Артефакт'],
      'rubric-people': ['Иван Крузенштерн', 'Наталья Гончарова'],
      'rubric-events': ['Ночь музеев', 'Лекторий'],
      'rubric-services': ['Экскурсия', 'Аудиогид'],
      'rubric-goods': ['Открытки', 'Каталог'],
      'rubric-brands': ['Музей и Партнёры', 'Архив'],
      'rubric-tourism': ['Кремль', 'Древний город'],
      'rubric-hobby': ['Коллекционирование', 'Реставрация'],
    },
  },
  {
    id: 'slide-4',
    name: 'Книжный дом',
    childNames: {
      'rubric-concept': ['Бестселлер', 'Жанр'],
      'rubric-people': ['Лев Толстой', 'Марина Цветаева'],
      'rubric-events': ['Книжный клуб', 'Автограф-сессия'],
      'rubric-services': ['Доставка книг', 'Подбор литературы'],
      'rubric-goods': ['Подарочные издания', 'Закладки'],
      'rubric-brands': ['Книжный дом', 'Издательство «Слово»'],
      'rubric-tourism': ['Библиотека', 'Литературный музей'],
      'rubric-hobby': ['Чтение', 'Буккроссинг'],
    },
  },
  {
    id: 'slide-5',
    name: 'Кофейня «Утро»',
    childNames: {
      'rubric-concept': ['Меню', 'Атмосфера'],
      'rubric-people': ['Бариста Алексей', 'Кондитер Ольга'],
      'rubric-events': ['Дегустация', 'Открытие сезона'],
      'rubric-services': ['Доставка кофе', 'Бронирование'],
      'rubric-goods': ['Зёрна', 'Десерты'],
      'rubric-brands': ['Утро', 'Обжарка «Заря»'],
      'rubric-tourism': ['Терраса', 'Кофейный тур'],
      'rubric-hobby': ['Латте-арт', 'Блогинг'],
    },
  },
  {
    id: 'slide-6',
    name: 'Городской парк',
    childNames: {
      'rubric-concept': ['Ландшафт', 'Зона отдыха'],
      'rubric-people': ['Садовник Пётр', 'Экскурсовод Анна'],
      'rubric-events': ['Фестиваль', 'Ярмарка'],
      'rubric-services': ['Прокат велосипедов', 'Экскурсии'],
      'rubric-goods': ['Мороженое', 'Сувениры'],
      'rubric-brands': ['Парк', 'Городские события'],
      'rubric-tourism': ['Пруд', 'Аллея'],
      'rubric-hobby': ['Бег', 'Йога'],
    },
  },
  {
    id: 'slide-7',
    name: 'Озеро Байкал',
    childNames: {
      'rubric-concept': ['Глубина', 'Эндемик'],
      'rubric-people': ['Гид Николай', 'Биолог Ирина'],
      'rubric-events': ['Ледовый переход', 'Фестиваль'],
      'rubric-services': ['Тур на катере', 'Гид-сопровождение'],
      'rubric-goods': ['Икра', 'Камни'],
      'rubric-brands': ['Байкал-Тур', 'Заповедник'],
      'rubric-tourism': ['Ольхон', 'Листвянка'],
      'rubric-hobby': ['Дайвинг', 'Фотоохота'],
    },
  },
  {
    id: 'slide-8',
    name: 'Курс фотографии',
    childNames: {
      'rubric-concept': ['Композиция', 'Экспозиция'],
      'rubric-people': ['Преподаватель Артём', 'Куратор Вера'],
      'rubric-events': ['Мастер-класс', 'Фотовыставка'],
      'rubric-services': ['Онлайн-курс', 'Разбор портфолио'],
      'rubric-goods': ['Объективы', 'Штативы'],
      'rubric-brands': ['ФотоШкола', 'Камера-Центр'],
      'rubric-tourism': ['Фотопленэр', 'Городская съёмка'],
      'rubric-hobby': ['Пейзаж', 'Портрет'],
    },
  },
];

export const mockSlides: INodeApi[] = SLIDE_DEFINITIONS.map(({ id, name }) => ({
  id,
  name,
  imageSrc: getImageSrc(id),
}));

export const getMockMainRubrics = (slideId: string): INodeMainRubric[] => {
  const slide = SLIDE_DEFINITIONS.find((definition) => definition.id === slideId);

  return MOCK_RUBRIC_DEFINITIONS.map((rubric) => {
    const childNames = slide?.childNames[rubric.id] ?? ['Узел 1', 'Узел 2'];

    return {
      id: rubric.id,
      nodes: childNames.map((name, index) => ({
        id: `${slideId}-${rubric.id}-${index + 1}`,
        name,
        mainImageSrc: getImageSrc(`${slideId}-${rubric.id}-${index}`),
      })),
    };
  });
};
