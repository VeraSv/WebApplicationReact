class Form extends React.Component {
    constructor(props) {
        super(props);
        this.onNameChange = this.onNameChange.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this);
        this.onCarChange = this.onCarChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.viewUser = this.viewUser.bind(this);
        this.findUser = this.findUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
   
   state = { name: "", age: 0, car: "", employees: []};
    onNameChange=(e)=> {
        this.setState({ name: e.target.value });
    }
    onAgeChange=(e)=> {
        this.setState({ age: e.target.value });
    }
    onCarChange=(e)=> {
        this.setState({ car: e.target.value });
    }
   
    async  saveUser() {
       
        var userName = this.state.name.trim();
        var userAge = this.state.age;
        var userCar = this.state.car;
        if (!userName) {
            alert("Enter name!");
            return;
        }
        if (userAge < 18 || userAge > 100) {
            alert("Age must be over 18!");
            return;
        }

        const data = new FormData();
        data.append("Name", userName);
        data.append("Age", userAge);
        data.append("Car", userCar);
        var xhr = new XMLHttpRequest();
        xhr.open("post", "api/Employee/Save", true);
        xhr.onload = await function () {
            if(xhr.status === 200) {
                alert("Saved successfully");
            
            }
        }.bind(this);
        xhr.send(data);
    }
    async  viewUser() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "api/Employee/View", true);
       
        xhr.onload = await function (e) {
            e.preventDefault();
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.response);
                if (data.length!=0) this.users = data.map(el => <li >{el}</li>);
                else alert("List is empty");
                }
                 this.setState({ employees: this.users });
            }.bind(this);
            xhr.send();
        
    }
    async  findUser() {
       var userName = this.state.name.trim();
        var userAge = this.state.age;
        var userCar = this.state.car;
        var info = userName || userAge || userCar;
        var xhr = new XMLHttpRequest();
        xhr.open("get", "api/Employee/Find/"+info, true);
        xhr.onload = await function (e) {
            e.preventDefault();
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.response);
                if (data.length!=0) this.users = data.map(el => <li>{el}</li>);
               else alert("List is empty");
            }
            this.setState({ employees: this.users });
        }.bind(this);
        xhr.send();

    }
    async deleteUser() {
        var userName = this.state.name.trim();
       
        var xhr = new XMLHttpRequest();
        xhr.open("delete", "api/Employee/Delete/"+userName, true);
        xhr.onload = await function (e) {
            e.preventDefault();
            if (xhr.status === 200) {
                alert(xhr.response);
            }
          
        }.bind(this);
        xhr.send();

    }
    render() {
        return (
            <div>
            <form>
                <p>
                    <input type="text"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.onNameChange} />
                </p>
                <p>
                    <input type="number"
                        placeholder="Age"
                        value={this.state.age}
                        onChange={this.onAgeChange} />
                </p>
                    <p>
                        <select onChange={this.onCarChange} defaultValue={ this.state.car}>
                            <option  value="Bmw">Bmw</option>
                            <option  value="Skoda">Skoda</option>
                            <option  value="Wv" >Wv</option>
                         </select>
                     
                </p>
                <input type="button" value="Save" onClick={ this.saveUser} />
                <input type="button" value="View" onClick={this.viewUser}/>
                    <input type="button" value="Find" onClick={this.findUser}/>
                    <input type="button" value="Delete" onClick={this.deleteUser}/>
                </form>
                <ul>
                    {this.state.employees}
                </ul>
                
                </div>
        );
    }
}

ReactDOM.render(
    <Form />,
    document.getElementById("content")
);