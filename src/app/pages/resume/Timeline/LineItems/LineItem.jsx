import React, { PropTypes } from 'react';
import Summary from './Summary/Summary';
import Experience from './Experience/Experience';
import Education from './Education/Education';
import Awards from './Awards/Awards';

function findType(name, info, key) {
  switch (name) {
    case 'Summary':
      return (<Summary text={info} key={key} />);
    case 'Experience':
      return (<Experience job={info} key={key} />);
    case 'Education':
      return (<Education school={info} key={key} />);
    case 'Awards':
      return (<Awards award={info} key={key} />);
    default:
      return null;
  }
}

function LineItem(props) {
  return (
    <div className="row">
      <div className="col-md-8 col-xs-10">
        <h1>{props.title}</h1>
        <div style={{ marginLeft: '1em' }}>
          {props.info.map((file, i) => findType(props.title, file, i))}
        </div>
      </div>
    </div>
  );
}

LineItem.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.array.isRequired,
};

export default LineItem;
