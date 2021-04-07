<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        elevation="0"
        title="Class Members"
        class="ml-4 px-0"
        dark
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account-group</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary" elevation="0">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="pl-2">Members</v-toolbar-title>
        <v-spacer />
        <v-select
          v-model="selectedStatus"
          :items="status"
          append-icon="mdi-menu-open"
          menu-props="auto"
          hide-details
          label="Member Type"
          dense
          single-line
          style="max-width: 150px"
        />
      </v-toolbar>
      <v-list>
        <v-list-item v-for="item in members[selectedStatus]" :key="item.uid">
          <v-list-item-title :title="item.name">
            {{ item.name }}
          </v-list-item-title>
          <v-list-item-action v-if="status" class="my-0">
            <v-select
              :items="status"
              append-icon="mdi-account"
              menu-props="auto"
              hide-details
              label="Change"
              dense
              single-line
              style="max-width: 150px"
              @change="update(item.uid)"
            ></v-select>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    code: {
      type: Object,
      default: () => ({
        code: null,
        creatorId: null,
      }),
    },
  },
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    selectedStatus: 'students',
    status: ['students', 'moderators', 'admins'],
    members: {
      students: [],
      pending: [],
      rejected: [],
      banned: [],
      admins: [],
      moderators: [],
    },
    loading: false,
  }),
  computed: {
    ...mapState(['user', 'userdata', 'loaded', 'userdataLoaded']),
  },
  created() {
    this.members.students = [
      {
        name: 'jericho',
      },
    ]
  },
  methods: {
    update(s, a) {
      console.log('update', s, a)
    },
  },
}
</script>
