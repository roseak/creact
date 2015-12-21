var Body = React.createClass({
  getInitialState() {
    return { skills: [] }
  },
  componentDidMount() {
    $.getJSON('/api/v1/skills.json', (response) => { this.setState({ skills: response }) });
  },
  handleSubmit(skill) {
    let newState = this.state.skills.concat(skill);
    this.setState({ skills: newState })
  },
  handleDelete(id) {
    $.ajax({
      url: `/api/v1/skills/${id}`,
      type: 'DELETE',
      success: () => {
        this.removeIdeaFromDOM(id);
      }
    });
  },
  handleUpdate(skill) {
    $.ajax({
      url: `/api/v1/skills/${skill.id}`,
      type: 'PUT',
      data: { skill: skill },
      success: () => {
        this.updateSkills(skill);
      }
    })
  },
  updateSkills(skill) {
    let skills = this.state.skills.filter((s) => { return s.id != skill.id });
    skills.push(skill);

    this.setState({ skills: skills });
  },
  removeIdeaFromDOM(id) {
    let newSkills = this.state.skills.filter((skill) => {
      return skill.id != id;
    });

    this.setState({ skills: newSkills });
  },
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6 new-skills'>
            <NewSkills handleSubmit={this.handleSubmit} />
          </div>
          <div className='col-md-6'>
            <AllSkills skills={this.state.skills} handleDelete={this.handleDelete} onUpdate={this.handleUpdate} />
          </div>
        </div>
      </div>
    )
  }
});
