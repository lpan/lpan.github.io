import React, { Component } from 'react';
import ProjectCard from './ProjectCard/ProjectCard';
import projects from '../../../text/projects';
import DrawnButton from '../../shared/DrawnButton/DrawnButton';

const animateStyle = {
  position: 'absolute',
  width: '100%',
  paddingBottom: '2em',
};

const btnStyle = {
  width: '7em',
  fontSize: '0.8em',
  fontWeight: 'bold',
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: '1em',
};

class Portfolio extends Component {

  constructor() {
    super();

    this.state = { projects, showAll: true };
    this._toggleActive = this._toggleActive.bind(this);
  }

  _toggleActive() {
    console.log(this.state);
    if (this.state.showAll) {
      this.setState({ projects: this.state.projects.filter(pro => pro.active ? pro : null), showAll: false });
      console.log('lol');
    } else {
      this.setState({ projects, showAll: true });
    }
  }

  render() {
    return (
      <div style={animateStyle}>
        <div className="row center-xs middle-xs">
          <h1 style={{ fontSize: '4em' }}>Projects&nbsp;&nbsp;</h1>
          <div style={btnStyle} onClick={this._toggleActive}>
            <DrawnButton text={this.state.showAll ? 'Show Active' : 'Show All'} />
          </div>
        </div>
        {this.state.projects.map((project, i) => <ProjectCard key={i} project={project} />)}
      </div>
    );
  }

}

export default Portfolio;
