import React from 'react';
// import css from './MceEditor.module.scss'
import {Editor} from "@tinymce/tinymce-react";

const MceEditor = (props) => {
  let init = {
    //Hack for avoid download css (it already included in index.scss)
    /* HACK START */
    content_css: false,
    skin: false,
    /* HACK END */
  };

  if (props.init) {
    init = {...props.init, ...init};
  }

  if (!init.hasOwnProperty('plugins')) {
    init.plugins = [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ]
  }

  if (!init.hasOwnProperty('toolbar')) {
    init.toolbar = 'undo redo | image | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
  }

  if (!init.hasOwnProperty('menubar')) {
    init.menubar = false;
  }

  return (
    <div className={props.className}>
      <Editor {...props} init={init}/>
    </div>
  );
};

export default MceEditor;
