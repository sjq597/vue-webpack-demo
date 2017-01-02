<template>
    <p v-text='msg'></p>
</template>

// scoped 表示样式作用于为当前组件
<style scoped>
	p {
		font-size: 18px;
		color: red;
	}

</style>

<script>
	module.exports={
		  data:function(){
		  	  return {
		  	  	  msg:'你好',
		  	  }
		  },
	}

</script>

