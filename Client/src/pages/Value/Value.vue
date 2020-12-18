<template style="font-size: 28px">
    <v-data-table 
      :headers="headers"
      :items="ValueList"
      :expanded.sync="expanded"
      class="elevation-1 mydata_table"
      item-key=""
      show-expand
      ref="table"
      id="mytable"
      :search="search"
      
      
    >
      <template v-slot:top>
        <v-snackbar
          top
          right
          :color="type"
          timeout="2000"
          vertical
          v-model="value"
        >
          {{ text }}
          <v-icon color="primary" dark class="myicon mb-2" @click.native="handleCloseSnackbar">mdi-close-circle</v-icon>
        </v-snackbar>
        <v-toolbar flat>
          <v-toolbar-title>Value</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
            <v-icon color="primary" dark class="myicon mb-2" v-bind="attrs" v-on="on"   @click="exportToExcel" ref="excel" >mdi-cloud-download</v-icon>
            </template> 
            <span>Download Excel</span>
          </v-tooltip>
          <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
          <v-icon color="primary" v-bind="attrs" v-on="on" dark class="myicon mb-2" @click="print">mdi-printer</v-icon>
            </template> 
            <span>Print</span>
          </v-tooltip>
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="primary" dark class="mb-2" v-bind="attrs" v-on="on" @click="resetForm">mdi-plus-circle</v-icon>
            </template>
            <v-card>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-toolbar
                  color="deep-purple accent-4"
                  dark
                  height="10px"
                >
                  <template v-slot:extension>
                    <v-tabs  v-model="tabs" centered >
                     <v-tab>
                        TAB 1
                      </v-tab>
                    </v-tabs>
                  </template>
                </v-toolbar>
                <v-tabs-items v-model="tabs">
					<v-tab-item>
                    <v-card-text>
                      <v-container>
                        <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.Name"
                              label="Name"
                              ref="Name"
                              :rules="[() => !!editedItem.Name || 'Please enter the value.']"
                              required
                              :error-messages="errorMessages"
                            ></v-text-field>
                          </v-col>
<v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.CreatedDate"
                              label="CreatedDate"
                              ref="CreatedDate"
                              :rules="[() => !!editedItem.CreatedDate || 'Please enter the value.']"
                              required
                              :error-messages="errorMessages"
                            ></v-text-field>
                          </v-col>

</v-row>
                      </v-container>
                    </v-card-text>
                  </v-tab-item>

                </v-tabs-items>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save" :disabled="disabledSaveButton">Save</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getValueList">Reset</v-btn>
      </template>
      
    </v-data-table>
</template>

<script>
import {json2excel} from 'js2excel';
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      value: false,
      tabs: null,
      search: '',
      expanded: [],
      menu_CreatedDate: false,

      dialog: false,
      dialogDelete: false,
      formHasErrors: false,
      errorMessages: "",
      valid: false,
      headers: [
        { text: "", value: "data-table-expand" },
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "Name"
        },
{
          text: "CreatedDate",
          align: "start",
          sortable: false,
          value: "CreatedDate"
        },

        { text: "Actions", value: "actions", sortable: false, class: "row_action" }
      ],
      editedIndex: -1,
      editedItem: {
        Name: "",
CreatedDate:  new Date().toISOString().substr(0, 10),

      },
      defaultItem: {
       Name: "",
CreatedDate:  new Date().toISOString().substr(0, 10),

      }
    };
  },
  computed: {
    ...mapState({
      ValueList: state => state.Valuevue.ValueList,
      showSnackBar: state => state.status.showSnackBar,
      type: state => state. status.type,
      text: state => state. status.text,
      editedNo: state => state. Valuevue.editedNo
    }),
    formTitle() {
      return this.editedIndex === -1 ? "Add Value" : "Edit Value";
    },
    disabledSaveButton() {
      return !this.valid
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    value(newValue) {
      if (!newValue) {
        this.handleCloseSnackbar();
      }
    },
    showSnackBar(newValue) {
      if (newValue) {
        this.value = true 
      }
    }
  },
  created() {
    this.getValueList();
  },
  methods: {
    ...mapActions({
      getValueList: "Valuevue/getValueList",saveValueList: "Valuevue/saveValueList", updateValueList: "Valuevue/updateValueList", deleteValueList: "Valuevue/deleteValueList"
    }),
    ...mapMutations({      
      handleCloseSnackbar: "status/setCloseSnackbar",
      set_editedNo:"Valuevue/set_editedNo"
    }),
    editItem(item) {
      this.editedIndex = item._id;
      this.set_editedNo(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item._id;
      this.set_editedNo(item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      //this.ValueList.splice(this.editedIndex, 1);
      this.deleteValueList(this.editedIndex),
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (!this.$refs.form.validate()) {
        this.snackbar = true;
      } else {
        if (this.editedIndex ==-1) {
          this.saveValueList(this.editedItem);
          this.close();
          
        } else {
          this.updateValueList(this.editedItem);
          this.close();
        }
      }
    },
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;
      if(this.$refs["Name"]){
      this.$refs["Name"].reset();
    }
if(this.$refs["CreatedDate"]){
      this.$refs["CreatedDate"].reset();
    }

      
    },
    exportToExcel(){
      let data= this.ValueList
      try {
        json2excel({
            data,
            name: 'Value',
            formateDate: 'yyyy/mm/dd'
        });
        } catch (e) {
            console.error('export error');
        }
    },
    print(){
        const clonedTable = document.getElementById("mytable").cloneNode(true);
				

				clonedTable.style.maxWidth = '100%';
				clonedTable.style.boxShadow = '0px 0px 0px 1px rgba(0,0,0,0.2)';
				clonedTable.style.margin = '20px auto';
        clonedTable.querySelector('.row_action').remove();
        clonedTable.querySelector('.v-input').remove();
        clonedTable.querySelector('.v-data-footer__select').remove();
				clonedTable.querySelectorAll('button').forEach(n => n.remove());

				let win = window.open('', '');


        win.document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif';
    
				win.document.body.innerHTML = (clonedTable.outerHTML);

				win.print();

				win.close();
    }
  }
};
</script>
<style>
 .myicon {
    margin-right: 15px;
 }
 .mydata_table {
   font-size: 16px;
 }
</style>