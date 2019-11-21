import React, {Component} from 'react';
import CreatableSelect from 'react-select/creatable';
import MceEditor from "../UI/MceEditor/MCEEditor";
import {Field,Formik} from "formik";
import * as yup from 'yup';
import FieldSelect from "../UI/FieldSelect/FieldSelect";
import FieldInput from "../UI/FieldInput/FieldInput";
import {connect} from "react-redux";
import {createGame} from "../../store/actions/game";
import Loader from "../UI/Loader/Loader";
import {Storage} from 'aws-amplify'
// import css from './CreateGameForm.module.scss';

class CreateGameForm extends Component {
  initialValues = {
    name: 'Виноделие',
    nameEng: '',
    genres: null,
    producer: null,
    lang: null,
    minAge: null,
    complexity: null,
    durationMin: '',
    durationMax: '',
    playersMin: null,
    playersMax: null,
    description: '<p>Тут должно быть описание</p>'
  };

  validationSchema = yup.object().shape({
    name: yup.string()
      .min(2, 'Слишком короткое название')
      .max(50, 'Слишком длинное название')
      .required('Обязательное поле'),
    nameEng: yup.string()
      .min(2, 'Слишком короткое название')
      .max(50, 'Слишком длинное название'),
    genres: yup.array()
      .nullable()
      .required('Выбирите жанр'),
    producer: yup.object()
      .nullable(),
    lang: yup.object()
      .nullable()
      .required('Выбирите язык'),
    minAge: yup.string()
      .nullable(),
    complexity: yup.string()
      .nullable(),
    durationMin: yup.number()
      .min(1, 'Минимум 1 минута'),
    durationMax: yup.number()
      .min(1, 'Минимум 1 минута')
      .when('durationMin', (durationMin, schema) => (
        durationMin ? schema.min(durationMin, 'Минимальная > максимальной') : schema
      )),
    playersMin: yup.object()
      .nullable()
      .required('Укажите количество игроков'),
    playersMax: yup.object()
      .nullable()
      .required('Укажите количество игроков'),
    description: yup.string()
      .required('Добавьте описание')
  });

  validation (values) {
    const errors = {};

    if (values.playersMax && values.playersMin
      && values.playersMax.value < values.playersMin.value
    ) {
      errors.playersMax = 'Выбирите правильные значения';
    }

    console.log('Values', values);
    console.log('Errors', errors);

    return errors;
  }

  onSubmit = (values) => {
    // game.complexity = _.get(game, 'complexity.value', null);
    // game.lang = _.get(game, 'lang.value', null);
    // game.minAge = _.get(game, 'minAge.value', null);
    // game.playersMin = _.get(game, 'playersMin.value', null);
    // game.playersMax = _.get(game, 'playersMax.value', null);

    this.props.createGame(values);
    console.log(values);
  };

  render() {
    const ages = [0,3,4,5,6,7,8,9,10,12,13,14,15,16,18].map((v) => ({value: v, label: v + '+'}));
    const players = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((v) => ({value: v, label: v}));
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
    const languages = [
      {value: 'ru', label: 'RU'},
      {value: 'ua', label: 'UA'},
      {value: 'eng', label: 'ENG'}
    ];

    //TODO добавить скрол к ошибке

    return (
      <>
        <Loader show={this.props.isLoading} type='local'/>
        <Formik
          initialValues={this.initialValues}
          validate={this.validation}
          validationSchema={this.validationSchema}
          onSubmit={this.onSubmit}
          children={(props) => (
            <form onSubmit={props.handleSubmit}>
              <h2>Добавить новую игру</h2>
              <div className="row">
                <div className="form-group col-sm-5">
                  <label htmlFor="name">Название</label>
                  <FieldInput
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder="Виноделие: Полное Издание"
                  />
                </div>
                {/*Название Англ*/}
                <div className="form-group col-sm-5">
                  <label htmlFor="name-eng">Название (Англ)</label>
                  <FieldInput
                    className="form-control"
                    name="nameEng"
                    id="name-eng"
                    placeholder="Viticulture: Full Edition"
                  />
                </div>
                {/*Язык*/}
                <div className="form-group col-sm-2">
                  <label>Язык</label>
                  <FieldSelect
                    name="lang"
                    styles={{
                      dropdownIndicator: (provided) => ({
                        ...provided,
                        padding: 0,
                      })
                    }}
                    options={languages}
                    placeholder="Язык"
                  />
                </div>
                {/*Жанр*/}
                <div className="form-group col-sm-6">
                  <label>Жанр</label>
                  <FieldSelect
                    name="genres"
                    isClearable
                    isMulti
                    options={genres}
                    placeholder={'Выбирите жанр'}
                  />
                </div>
                {/*Производитель*/}
                <div className="form-group col-sm-6">
                  <label>Производитель</label>
                  <FieldSelect
                    name="producer"
                    component={CreatableSelect}
                    isClearable
                    options={producers}
                    placeholder={'Выбирите или добавьте'}
                  />
                </div>
              </div>
              <h4>Характеристики</h4>
              <div className="row">
                {/*Возраст*/}
                <div className="form-group col-sm-3">
                  <label>Минимальный Возраст</label>
                  <FieldSelect
                    name="minAge"
                    options={ages}
                    placeholder={'Выбирите возраст'}
                  />
                </div>
                {/*Сложность осовения*/}
                <div className="form-group col-sm-3">
                  <label htmlFor="name-eng">Сложность освоения</label>
                  <FieldSelect
                    name="complexity"
                    options={complexity}
                    placeholder={'Выбирите сложность'}
                  />
                </div>
                {/*Длительность партии*/}
                <div className="form-group col-sm-3">
                  <label>Длительность партии (минут)</label>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="row">
                        <div className="col-md-6">
                          <FieldInput
                            type="number"
                            className="form-control"
                            name="durationMin"
                            placeholder="15"
                            withoutError
                          />
                        </div>
                        <div className="col-md-6">
                          <FieldInput
                            type="number"
                            className="form-control"
                            name="durationMax"
                            placeholder="60"
                            withoutError
                          />
                        </div>
                      </div>
                      {((props.errors.durationMin && props.touched.durationMin)
                        || (props.errors.durationMax && props.touched.durationMax))
                      && <small
                        className="form-text text-danger">{props.errors.durationMin || props.errors.durationMax}</small>}
                    </div>
                  </div>
                </div>
                {/*Количество игроков*/}
                <div className="form-group col-sm-3">
                  <label>Количество игроков</label>
                  <div className="row">
                    <div className="col-sm-6">
                      <FieldSelect
                        name="playersMin"
                        options={players}
                        placeholder={'1'}
                        withoutError
                      />
                    </div>
                    <div className="col-sm-6">
                      <FieldSelect
                        name="playersMax"
                        options={players}
                        placeholder={'1'}
                        withoutError
                      />
                    </div>
                    <div className="col-sm-12">
                      {((props.errors.playersMin && props.touched.playersMin)
                        || (props.errors.playersMax && props.touched.playersMax))
                      && <small
                        className="form-text text-danger">{props.errors.playersMin || props.errors.playersMax}</small>}
                    </div>
                  </div>
                </div>
              </div>
              <h4>Описание</h4>
              <div className="row">
                <div className="col-sm-12 mb-3">
                  <Field name="description">
                    {({field, meta, form}) => (
                      <>
                        <MceEditor
                          initialValue={field.value}
                          init={{
                            images_upload_url: true,
                            images_upload_handler: () => console.log('12312')
                          }}
                          onChange={(e, editor) => {
                            form.setFieldValue(field.name, editor.getContent())
                          }}
                          onBlur={() => {
                            form.setFieldTouched(field.name, true)
                          }}
                        />
                        {meta.error && meta.touched && <small className="form-text text-danger">{meta.error}</small>}
                      </>
                    )}
                  </Field>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Отправить</button>
            </form>
          )}
        />
        <button onClick={() => {
          Storage.put('test.txt', 'Hello')
            .then (result => console.log(result))
            .catch(err => console.log(err));
        }}>Отправить на S3</button>
      </>
    );
  }
}

function mapStateToProps(state) {
    return {
      game: state.game.game,
      isLoading: state.game.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
      createGame: (game) => dispatch(createGame(game))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGameForm);
