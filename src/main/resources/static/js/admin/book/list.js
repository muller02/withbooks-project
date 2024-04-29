const { createApp } = Vue;

createApp({
  data() {
    return {
      query:"",
      queryType:"all",
      categoryId:0,
      showDetailRow:{}

    }
  },
  methods:{
    submitHandler(){
       console.log(this.query);
       console.log(this.queryType);
        
    },
    toggleRow(id){
        this.showDetailRow[id] = !this.showDetailRow[id];
    }
  },
}).mount('.search-form');