import Axios from "axios";
import { 
    server_url 
} from '../constant/constant';

export default {
    namespaced: true,
    state: {
        ValueList: [],     
        editedNo:null,
    },
    mutations: {
        setValueList(currentState, data){
            currentState.ValueList = data;
        },
        pushValueList(currentState,data){
            currentState.ValueList.push(data);
        },
        updateValueList(currentState, data){
            Object.assign(currentState.ValueList[currentState.editedNo], data);
        },
        deleteValueList(currentState){
            currentState.ValueList.splice(currentState.editedNo,1);
        },
        set_editedNo(currentState,data){
          currentState.editedNo = currentState.ValueList.indexOf(data);
        },
    },
    actions: {
        async getValueList(context) {
            context.rootState.status.loading = true;
            context.rootState.status.showSnackBar = false;
            Axios.get(`${server_url}/value`)
                 .then(response => {
                    let data = response.data;
                    context.rootState.status.loading = false;
                    context.rootState.status.type = "success";
                    context.rootState.status.text = "All value data has retrieved successfully."
                    context.rootState.status.showSnackBar = true;
                    context.commit("setValueList", data);
                 })
                 .catch(err => {
                     if (err) {                         
                        context.rootState.status.loading = false;
                        context.rootState.status.type = "error";
                        context.rootState.status.text = "Error is occuepied while getting value data.";
                        context.rootState.status.showSnackBar = true;
                     }
                 })
        },
        async saveValueList(context,Value) {
            context.rootState.status.loading =true;
            context.rootState.status.showSnackBar =false;
            Axios.post(`${server_url}/value`,Value)
                 .then(response =>{
                     let data = response.data;
                     context.rootState.status.loading = false;
                     context.rootState.status.type = "success";
                     context.rootState.status.text ="Value data has saved successfully!";
                     context.rootState.status.showSnackBar = true;
                     context.commit("pushValueList",data);
                 })
                 .catch(err => {
                     if (err){
                         console.log(err);
                         context.rootState.status.loading =false;
                         context.rootState.status.type ="error";
                         context.rootState.status.text = "Error is occuepied while saving Value data!";
                         context.rootState.status.showSnackBar = true;
                     }
                 })
        },
        async updateValueList(context,Value) {
            context.rootState.status.loading= true;
            context.rootState.status.showSnackBar =false;
            Axios.put(`${server_url}/value/${Value._id}`,Value)
                 .then(response =>{
                     let data = response.data;
                     context.rootState.status.loading =false;
                     context.rootState.status.type = "success";
                     context.rootState.status.text = "Value data has updated successfully!";
                     context.rootState.status.showSnackBar =true;
                     context.commit("updateValueList",data);
                 })
                 .catch(err => {
                    if (err){
                        console.log(err);
                        context.rootState.status.loading =false;
                        context.rootState.status.type ="error";
                        context.rootState.status.text = "Error is occuepied while updating Value data!";
                        context.rootState.status.showSnackBar = true;
                    }
                })
        },
        async deleteValueList(context,_id) {
            context.rootState.status.loading =true;
            context.rootState.status.showSnackBar = false;
            Axios.delete(`${server_url}/value/${_id}`)
                 .then(response =>{
                     context.rootState.status.loading =false;
                     context.rootState.status.type = "success";
                     context.rootState.status.text = "Value data has deleted successfully!";
                     context.rootState.status.showSnackBar =true;
                     context.commit("deleteValueList");
                     console.log(response.data);
                 })
                 .catch(err => {
                    if (err){
                        console.log(err);
                        context.rootState.status.loading =false;
                        context.rootState.status.type ="error";
                        context.rootState.status.text = "Error is occuepied while deleting Value data!";
                        context.rootState.status.showSnackBar = true;
                    }
                })
        }
    }

}