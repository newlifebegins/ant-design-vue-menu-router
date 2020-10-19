<template functional>
  <a-sub-menu :key="props.menuInfo.path">
    <span slot="title">
      <a-icon type="user" />
      <span>{{ props.menuInfo.label }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="!item.children.length && item.type !== 3"
        :key="item.path"
      >
        <router-link :to="{ name: item.path }">
          <span>{{ item.label }}</span>
        </router-link>
      </a-menu-item>
      <sub-menu
        v-else-if="item.children.length"
        :key="item.path"
        :menu-info="item"
      />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ["menuInfo"]
};
</script>
