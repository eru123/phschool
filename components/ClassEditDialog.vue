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
        class="ml-4 px-0"
        v-bind="attrs"
        title="Edit Class"
        dark
        v-on="on"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Edit Class</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="save"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-subheader>User Controls</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Content filtering</v-list-item-title>
            <v-list-item-subtitle>
              Set the content filtering level to restrict apps that can be
              downloaded
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Password</v-list-item-title>
            <v-list-item-subtitle
              >Require password for purchase or use password to restrict
              purchase</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list three-line subheader>
        <v-subheader>General</v-subheader>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="notifications"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Notifications</v-list-item-title>
            <v-list-item-subtitle
              >Notify me about updates to apps or games that I
              downloaded</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="sound"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sound</v-list-item-title>
            <v-list-item-subtitle
              >Auto-update apps at any time. Data charges may
              apply</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="widgets"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Auto-add widgets</v-list-item-title>
            <v-list-item-subtitle
              >Automatically add home screen widgets</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
  }),
  methods: {
    save() {
      this.dialog = false
    },
  },
}
</script>
