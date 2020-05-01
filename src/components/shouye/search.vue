<template>
    <div class="search">
        <i class="el-icon-search"></i>
        <input type="text" placeholder="请输入想要搜索的内容">
    </div>
</template>
<script>
export default {
    data(){
        return{
           searchcontent:'', 
        }
    }
    
      
    
}
</script>
<style lang="scss" scoped>
.search{
    border-radius: 5vw; 
    border: none;
    height: 10vw;
    width: 80%;
    margin-right: 5%;
    padding:0 5%;
    background-color: #ffffff;
    input{
        height: 100%;
        border: none;
        width: 90%;
        outline: none;
        margin-left: 2vw;
    }
}
</style>