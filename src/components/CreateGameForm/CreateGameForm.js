import React, {Component} from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from '../UI/Select/Select';
import {Editor} from "@tinymce/tinymce-react";
// import css from './CreateGameForm.module.scss';

class CreateGameForm extends Component {

  static state = {

  };

  onChangeGenre = (values) => {

    console.log(values);
  };


  render() {
    const ages = [0,3,4,5,6,7,8,9,10,12,13,14,15,16,18];
    const players = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    const genres = [
      {value: 'wargame', label: 'Варгеймы'},
      {value: 'funny', label: 'Веселые'},
      {value: 'sport', label: 'Спорт'},
      {value: 'city-building', label: 'Градостроение'},
      {value: 'cards', label: 'Карточные'},
      {value: 'detectives', label: 'Детективы'},
    ];
    const producers = [
      {value: 'ГЕМЕНОТ', label: 'ГЕМЕНОТ'},
      {value: 'ZOCH VERLAG', label: 'ZOCH VERLAG'},
      {value: 'HOBBY WORLD', label: 'HOBBY WORLD'},
    ];
    const complexity = [
      {value: 'elementary', label: 'Элементарно'},
      {value: 'easy', label: 'Легко'},
      {value: 'medium', label: 'Средне'},
      {value: 'difficult', label: 'Сложно'},
    ];

    return (
      <form>
        <h2>Добавить новую игру</h2>
        <div className="row">
          {/*Название*/}
          <div className="form-group col-sm-6">
            <label htmlFor="name">Название</label>
            <input type="text" className="form-control" id="name" placeholder="Виноделие: Полное Издание" />
            {/*<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone*/}
            {/*  else.</small>*/}
          </div>
          {/*Название Англ*/}
          <div className="form-group col-sm-6">
            <label htmlFor="name-eng">Название (Англ)</label>
            <input type="text" className="form-control" id="name-eng" placeholder="Viticulture: Full Edition" />
          </div>
          {/*Жанр*/}
          <div className="form-group col-sm-5">
            <label htmlFor="name-eng">Жанр</label>
            <Select
              isClearable
              onChange={this.onChangeGenre}
              options={genres}
              placeholder={'Выбирите жанр'}
              className={'test'}
            />
          </div>
          {/*Производитель*/}
          <div className="form-group col-sm-5">
            <label htmlFor="name-eng">Производитель</label>
            <CreatableSelect
              isClearable
              isMulti
              onChange={this.onChangeGenre}
              options={producers}
              placeholder={'Выбирите или добавьте'}
            />
            {/*<small className="form-text text-muted">Выбирите или добавьте</small>*/}
          </div>
          {/*Язык*/}
          <div className="form-group col-sm-2">
            <label>Язык</label>
            <Select
              onChange={this.onChangeGenre}
              styles={{
                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: 0,
                })
              }}
              options={[
                {value: 'ru', label: 'RU'},
                {value: 'ua', label: 'UA'},
                {value: 'eng', label: 'ENG'}
              ]}
              placeholder={'RU'}
              components={{
                // IndicatorsContainer: () => null,
              }}
            />
          </div>
        </div>
        <h4>Характеристики</h4>
        <div className="row">
          {/*Возраст*/}
          <div className="form-group col-sm-3">
            <label>Минимальный Возраст</label>
            <select name="age" className="form-control">
              {ages.map(age => (
                <option value={age} key={age}>{age}+</option>
              ))}
            </select>
          </div>
          {/*Сложность осовения*/}
          <div className="form-group col-sm-3">
            <label htmlFor="name-eng">Сложность освоения</label>
            <Select
              onChange={this.onChangeGenre}
              options={complexity}
              placeholder={'Выбирите сложность'}
            />
          </div>
          {/*Длительность партии*/}
          <div className="form-group col-sm-3">
            <label>Длительность партии (минут)</label>
            <div className="row">
              <div className="col-md-6">
                <input type="number" className="form-control " placeholder="15" />
              </div>
              <div className="col-md-6">
                <input type="number" className="form-control " placeholder="60" />
              </div>
            </div>
          </div>
          {/*Количество игроков*/}
          <div className="form-group col-sm-3">
            <label>Количество игроков</label>
            <div className="row">
              <div className="col-md-6">
                <select name="playersMin" className="form-control">
                  {players.map(number => (
                    <option value={number} key={number}>{number}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <select name="playersMax" className="form-control">
                  {players.map(number => (
                    <option value={number} key={number}>{number}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <h4>Описание</h4>
        <div className="row">
          <div className="col-sm-12">
            <Editor
              initialValue="<p>This is the initial content of the editor</p>"
              init={{
                height: 500,
                menubar: false,
                //Hack for avoid download css (it already included in index.scss)
                /* HACK START */
                content_css: false,
                skin: false,
                /* HACK END */
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | image | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
              }}
              // onChange={this.handleEditorChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default CreateGameForm;