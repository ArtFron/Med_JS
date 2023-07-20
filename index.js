// Доктор принимает с 9 утра до 9 вечера.
// Часть времени у него занята: приемы, обед, уборка кабинета.
// busy = [
// {'start' : '10:30',
// 'stop' : '10:50'
// },
// {'start' : '18:40',
// 'stop' : '18:50'
// },
// {'start' : '14:40',
// 'stop' : '15:50'
// },
// {'start' : '16:40',
// 'stop' : '17:20'
// },
// {'start' : '20:05',
// 'stop' : '20:20'
// }
// ]

// Требуется сформировать список свободных окон по 30 минут.

// Начало и конец рабоч дня
const startTime = new Date('2023-01-01 09:00');
const endTime = new Date('2023-01-01 21:00');

const busy = [
  { start: '10:30', stop: '10:50' },
  { start: '18:40', stop: '18:50' },
  { start: '14:40', stop: '15:50' },
  { start: '16:40', stop: '17:20' },
  { start: '20:05', stop: '20:20' },
];

// Преобраз занятых интервалов во временные метки
const busyIntervals = busy.map((interval) => {
  const start = new Date(`2023-01-01 ${interval.start}`);
  const stop = new Date(`2023-01-01 ${interval.stop}`);
  return { start, stop };
});

// Создание списка свободных окон
const freeWindows = [];
let currentStart = startTime;
while (currentStart < endTime) {
  const currentStop = new Date(currentStart.getTime() + 30 * 60 * 1000); // 30 минут в миллисекундах

  // Проверка, не пересекается ли тек окно с занятым
  let isBusy = false;
  for (const busyInterval of busyIntervals) {
    if (
      (currentStart >= busyInterval.start &&
        currentStart < busyInterval.stop) ||
      (currentStop > busyInterval.start && currentStop <= busyInterval.stop)
    ) {
      isBusy = true;
      break;
    }
  }

  // Если тек окно свободно пушим в список
  if (!isBusy) {
    freeWindows.push({
      start: currentStart.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      stop: currentStop.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  }

  // Переходим к следующему окну
  currentStart.setTime(currentStart.getTime() + 30 * 60 * 1000);
}

// Вывод списка
freeWindows.forEach((window) => {
  console.log(`${window.start} - ${window.stop}`);
});
