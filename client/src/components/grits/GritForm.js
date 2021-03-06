// GritForm shows a form for a user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import GritField from './GritField';

class GritForm extends Component {

    renderFields(){
        return (
            <div>
               <Field label="Task to do" type="text" name="task" component={GritField} /> 
                <Field label="Important" type="checkbox" name="urgenk" component={GritField} /> 

            </div>
        );    
        
    }


    render() {
            return (
                <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <button type="submit">Submit</button>
                </form>
                </div>
            );
    }
}

export default reduxForm({
    form: 'gritForm'    
})(GritForm);
