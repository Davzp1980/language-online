import { useSelector } from 'react-redux';
import css from './FavoritePage.module.css';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { selectFavorites } from '../../redux/teachers/selectors';
import { useState } from 'react';
import TeacherItem from '../../components/TeacherItem/TeacherItem';

function FavoritePage() {
  //   const teachersArr = useSelector(selectAllTeachers);

  // console.log(teachersArr);

  const favorite = useSelector(selectFavorites);

  const languageOptions = [
    { value: 'french', label: 'French' },
    { value: 'english', label: 'English' },
    { value: 'german', label: 'German' },
    { value: 'ukrainian', label: 'Ukrainian' },
    { value: 'polish', label: 'Polish' },
  ];

  const levelOptions = [
    { value: 'A1 Beginner', label: 'A1 Beginner' },
    { value: 'A2 Elementary', label: 'A2 Elementary' },
    { value: 'B1 Intermediate', label: 'B1 Intermediate' },
    { value: 'B2 Upper-Intermediate', label: 'B2 Upper-Intermediate' },
  ];

  const priceOptions = [
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '30', label: '30' },
    { value: '40', label: '40' },
  ];

  const styles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? 'red' : 'red',
      border: 'none',
      borderRadius: '14px',
      width: 'auto',
      fontSize: 18,
      fontWeight: 500,
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: '#fff', // Фон меню
      borderRadius: '14px', // Скругление углов
      boxShadow: 'none', // Тень
      padding: '14px 18px', // Внутренние отступы
      width: '100%',
    }),
    menuList: provided => ({
      ...provided,
      // maxHeight: '200px', // Ограничение высоты (чтобы появлялся скролл)
      padding: '0',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: 'none',
      color: state.isFocused ? 'rgba(18, 20, 23)' : 'rgba(18, 20, 23, 0.2)',
      padding: '4px',
      cursor: 'pointer',
      fontSize: 18,
      fontWeight: 500,
    }),
    placeholder: provided => ({
      ...provided,
      color: '#121217', // Цвет плейсхолдера
    }),
    indicatorSeparator: () => ({ display: 'none' }),
  };

  const [selectedLanguageOption, setLanguageOption] = useState('French');
  const [selectedLevelOption, setLevelOption] = useState('A1 Beginner');
  const [selectedPriceOption, setPriceOption] = useState('10');

  return (
    <div className={css.container}>
      <div className={css.filtersContainer}>
        <div className={css.languagesContainer}>
          <p className={css.selectDesc}>Languages</p>
          <div style={{ width: '221px' }}>
            <Select
              className={css.selectContainer}
              styles={styles}
              defaultValue={selectedLanguageOption}
              onChange={setLanguageOption}
              options={languageOptions}
              // components={{ DropdownIndicator: CustomDropdownIndicator }}
              placeholder={languageOptions[0].label}
            />
          </div>
        </div>
        <div className={css.levelContainer}>
          <p className={css.selectDesc}>Level of knowledge</p>
          <div style={{ width: '198px' }}>
            <Select
              className={css.selectContainer}
              styles={styles}
              defaultValue={selectedLanguageOption}
              onChange={setLevelOption}
              options={levelOptions}
              // components={{ DropdownIndicator: CustomDropdownIndicator }}
              placeholder={levelOptions[0].label}
            />
          </div>
        </div>
        <div className={css.priceContainer}>
          <p className={css.selectDesc}>Price</p>
          <div style={{ width: '124px' }}>
            <Select
              className={css.selectContainer}
              styles={styles}
              defaultValue={selectedLanguageOption}
              onChange={setPriceOption}
              options={priceOptions}
              // components={{ DropdownIndicator: CustomDropdownIndicator }}
              placeholder={priceOptions[0].label}
            />
          </div>
        </div>
      </div>
      <div>
        <ul className={css.teachersList}>
          {favorite?.map(teacher => (
            <TeacherItem key={uuidv4()} teacher={teacher} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FavoritePage;
