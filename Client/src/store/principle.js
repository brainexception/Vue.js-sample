import Axios from "axios";
import { 
    server_url 
} from '../constant/constant';

export default {
    namespaced: true,
    state: {
        PrincipleList: [],     
        editedNo:null,
    },
    mutations: {
        setPrincipleList(currentState, data){
            currentState.PrincipleList = data;
        },
        pushPrincipleList(currentState,data){
            currentState.PrincipleList.push(data);
        },
        updatePrincipleList(currentState, data){
            Object.assign(currentState.PrincipleList[currentState.editedNo], data);
        },
        deletePrincipleList(currentState){
            currentState.PrincipleList.splice(currentState.editedNo,1);
        },
        set_editedNo(currentState,data){
          currentState.editedNo = currentState.PrincipleList.indexOf(data);
        },
    },
    actions: {
        async getPrincipleList(context) {
            context.rootState.status.loading = true;
            context.rootState.status.showSnackBar = false;
            Axios.get(`${server_url}/principle`)
                 .then(response => {
                    let data = response.data;
                    context.rootState.status.loading = false;
                    context.rootState.status.type = "success";
                    context.rootState.status.text = "All principle data has retrieved successfully."
                    context.rootState.status.showSnackBar = true;
                    context.commit("setPrincipleList", data);
                 })
                 .catch(err => {
                     if (err) {                         
                        context.rootState.status.loading = false;
                        context.rootState.status.type = "error";
                        context.rootState.status.text = "Error is occuepied while getting principle data.";
                        context.rootState.status.showSnackBar = true;
                     }
                 })
        },
        async savePrincipleList(context,Principle) {
            context.rootState.status.loading =true;
            context.rootState.status.showSnackBar =false;
            Axios.post(`${server_url}/principle`,Principle)
                 .then(response =>{
                     let data = response.data;
                     context.rootState.status.loading = false;
                     context.rootState.status.type = "success";
                     context.rootState.status.text ="Principle data has saved successfully!";
                     context.rootState.status.showSnackBar = true;
                     context.commit("pushPrincipleList",data);
                 })
                 .catch(err => {
                     if (err){
                         console.log(err);
                         context.rootState.status.loading =false;
                         context.rootState.status.type ="error";
                         context.rootState.status.text = "Error is occuepied while saving Principle data!";
                         context.rootState.status.showSnackBar = true;
                     }
                 })
        },
        async updatePrincipleList(context,Principle) {
            context.rootState.status.loading= true;
            context.rootState.status.showSnackBar =false;
            Axios.put(`${server_url}/principle/${Principle._id}`,Principle)
                 .then(response =>{
                     let data = response.data;
                     context.rootState.status.loading =false;
                     context.rootState.status.type = "success";
                     context.rootState.status.text = "Principle data has updated successfully!";
                     context.rootState.status.showSnackBar =true;
                     context.commit("updatePrincipleList",data);
                 })
                 .catch(err => {
                    if (err){
                        console.log(err);
                        context.rootState.status.loading =false;
                        context.rootState.status.type ="error";
                        context.rootState.status.text = "Error is occuepied while updating Principle data!";
                        context.rootState.status.showSnackBar = true;
                    }
                })
        },
        async deletePrincipleList(context,_id) {
            context.rootState.status.loading =true;
            context.rootState.status.showSnackBar = false;
            Axios.delete(`${server_url}/principle/${_id}`)
                 .then(response =>{
                     context.rootState.status.loading =false;
                     context.rootState.status.type = "success";
                     context.rootState.status.text = "Principle data has deleted successfully!";
                     context.rootState.status.showSnackBar =true;
                     context.commit("deletePrincipleList");
                     console.log(response.data);
                 })
                 .catch(err => {
                    if (err){
                        console.log(err);
                        context.rootState.status.loading =false;
                        context.rootState.status.type ="error";
                        context.rootState.status.text = "Error is occuepied while deleting Principle data!";
                        context.rootState.status.showSnackBar = true;
                    }
                })
        }
    }

}