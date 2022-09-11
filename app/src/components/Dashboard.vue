<template>
  <div class="q-pa-md" style="max-width: 350px">
    <p>
      When pressing 'assign to teams', a team will be created for each breakout
      room with each attendee assigned as a member
    </p>

    <div v-if="loading" class="loading">Loading ...</div>
    <div v-if="!loading">
      <div>
        <q-btn @click="createTeams" label="Assign to teams" />
      </div>
      <div v-if="teams !== null" class="sucess">Sucess</div>
      <div v-if="error !== null">
        <div class="error">error</div>
        <div>{{ this.error }}</div>
      </div>

      <div v-if="teams !== null">
        <div v-for="team in teams" :key="team.teamName" class="team">
          <div class="teamName">{{ team.teamName }}</div>
          <q-list bordered separator>
            <q-item
              clickable
              v-ripple
              :active="active"
              v-for="member in team.members"
              :key="member.userId"
            >
              <q-item-section>{{ member.username }}</q-item-section>
              <q-item-section side>{{ member.userRole }}</q-item-section>
            </q-item>
            <q-item clickable v-ripple :active="active">
              <q-item-section>{{ team.sensorId }}</q-item-section>
              <q-item-section side>ZoomSense Bot</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveBreakoutRoomsAsTeams } from "./createTeams";
export default {
  name: "Dashboard",
  data() {
    return {
      teams: null,
      error: null,
      loading: false,
    };
  },
  props: {
    context: { required: true },
    firebase: { required: true },
    functions: { required: true },
  },
  watch: {
    firebase: {
      immediate: true,
      async handler() {
        if (!this.context.meetingid) return;
      },
    },
  },
  methods: {
    async createTeams() {
      this.loading = true;
      // try save teams
      saveBreakoutRoomsAsTeams(this.context.meetingid, this.firebase)
        // successs -> stop loading, save teams and set error to null
        .then((result) => {
          this.error = null;
          this.teams = result;
          this.loading = false;
        })

        // error -> stop loading and show error
        .catch((error) => {
          this.loading = false;

          this.error = error;
        });
    },
  },
};
</script>

<style>
.team {
  margin: 30px;
}
.teamName {
  font-size: 20px;
  font-weight: bold;
}
.sucess {
  font-size: 20px;
  font-weight: bold;
  color: green;
  margin-top: 20px;
}
.error {
  font-size: 20px;
  font-weight: bold;
  color: red;
  margin-top: 20px;
}
.loading {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
}
</style>
