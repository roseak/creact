var NewSkills = React.createClass ({
  handleClick() {
    let name = this.refs.name.value;
    let details = this.refs.details.value;

    $.ajax({
      url: '/api/v1/skills',
      type: 'POST',
      data: { skill: { name: name, details: details } },
      success: (skill) => {
        this.props.handleSubmit(skill);
      }
    });
  },
  render() {
    return (
      <div>
        <form>
          <div className='form-group'>
            <input className='form-control' ref='name' placeholder='Enter name of skill' />
            <input className='form-control' ref='details' placeholder='Details' />
            <button className='btn btn-primary' onClick={this.handleClick}>Submit</button>
          </div>
        </form>
    </div>
    )
  }
});
