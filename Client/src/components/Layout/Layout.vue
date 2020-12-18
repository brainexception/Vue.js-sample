<template>
    <v-app class="pa-6">
        <Header />
        <Sidebar />
        <v-main class="content">
            <v-progress-linear
                :active="loading"
                color="primary"
                indeterminate
            ></v-progress-linear>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
    import Header from '@/components/Header/Header';
    import Sidebar from '@/components/Sidebar/Sidebar';
    import { mapState } from "vuex";
    import './Layout.scss';

    export default {
        name: 'Layout',
        components: { Header, Sidebar },
        computed: {
            ...mapState({
                loading: state => state.status.loading
            })
        }
    };
</script>

<style src="./Layout.scss" lang="scss" />
