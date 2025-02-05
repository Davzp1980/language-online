import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from 'firebase/database';

import { database } from '../../firebaseConfig';

// export const fetchTeachers = createAsyncThunk(
//   'teachers/getAll',
//   async (_, thunkAPI) => {
//     try {
//       const dbRef = ref(database);

//       const snapshot = await get(dbRef);

//       if (snapshot.exists()) {
//         const rawData = snapshot.val();

//         return rawData;
//       } else {
//         return thunkAPI.rejectWithValue('No data found');
//       }
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async ({ pageSize = 4, lastKey = null, filters }, thunkAPI) => {
    try {
      // Формируем запрос

      let dbQuery = lastKey
        ? query(
            ref(database),
            orderByKey(),
            startAt(lastKey),
            limitToFirst(pageSize + 1)
          )
        : query(ref(database), orderByKey(), limitToFirst(pageSize + 1));

      // Получаем данные
      const snapshot = await get(dbQuery);

      if (!snapshot.exists()) {
        return thunkAPI.rejectWithValue('No data found');
      }

      const rawData = snapshot.val();
      const teachersArray = Object.entries(rawData).map(([id, teacher]) => ({
        id,
        ...teacher,
      }));

      // Проверяем, есть ли ещё данные
      const hasMore = teachersArray.length > pageSize;

      return {
        teachers: hasMore ? teachersArray.slice(0, -1) : teachersArray, // Убираем лишний элемент
        lastKey: hasMore ? teachersArray[teachersArray.length - 1].id : null, // Обновляем lastKey
        hasMore,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
