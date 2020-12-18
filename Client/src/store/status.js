

export default {
    namespaced: true,
    state: {
        loading: false,
        type: "",
        text: "",
        showSnackBar: false
    },
    mutations: {
        setLoading(currentState, data) {
            currentState.loading = data.loading;
        },
        setCloseSnackbar(currentState) {
            currentState.showSnackBar = false
        }
    }
}