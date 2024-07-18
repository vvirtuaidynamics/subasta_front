<script setup>
import {useApp} from "src/composables/useApp";
import {utils} from "src/helpers/utils";
import {$t} from "src/services/i18n";
import authService from "src/services/authService";
import {useRouter, useRoute} from "vue-router";

defineOptions({
  name: "UserMenu",
});

const {logout} = authService()
const {avatar, isAuthenticated, user, loading, setAppState, notificationsPosition, navigateTo} = useApp()


const handleLogout = async () => {
  let addAvatar = {}
  if (user && user.avatar) addAvatar = {avatar: user.avatar}
  await logout()
  utils.sendMsg({
    msg: $t('Logout success'),
    type: "positive",
    position: notificationsPosition?.value || 'bottom',
    ...addAvatar
  });
}

const navigate = (payload) => {
  navigateTo(payload, $router, $route)
}


</script>

<template>
  <!-- Inicio menu de usuario -->
  <q-btn-dropdown
    content-class="no-shadow q-pa-sm q-ml-lg"
    no-caps
    stretch
    unelevated
  >
    <template #label>
      <!--              <q-avatar-->
      <!--                :style="`${'background: #2c2c2c99'}`"-->
      <!--                class="flex flex-center shadow-2"-->
      <!--                size="42px"-->
      <!--                style="border: 2px solid #c0c0c0"-->
      <!--              >-->
      <q-img
        class="flex flex-center shadow-3"
        :src="avatar"
        fit="contain"
        style="
                  width: 36px;
                  height: 36px;
                  border: 2px solid #c0c0c0;
                  border-radius: 8px;
                "
      />
      <!--              </q-avatar>-->
    </template>
    <template #default>
      <q-card bordered class="shadow-3" style="border-radius: 15px">
        <q-card-section class="no-margin q-pa-xs">
          <div
            class="flex flex-center column q-gutter q-gutter-y-xs full-width"
          >
            <div>
              <q-btn
                :icon="
                          $q.fullscreen.isActive
                            ? 'fullscreen_exit'
                            : 'fullscreen'
                        "
                :title="$t('fullscreenBtn')"
                class="absolute-top-left"
                flat
                round
                size="md"
                @click="()=>$q.fullscreen.toggle()"
              >
                <q-tooltip
                  anchor="center right"
                  class="bg-amber text-black text-caption text-center"
                  self="center left"
                  style="min-width: 250px"
                >{{
                    `${
                      $q.fullscreen.isActive
                        ? $t("disable")
                        : $t("enable")
                    } ${$t("fullscreenBtn")}`
                  }}
                </q-tooltip>
              </q-btn>

              <!--                      <q-avatar-->
              <!--                        :style="`${'background: #2c2c2c99'}`"-->
              <!--                        class="flex flex-center shadow-2"-->
              <!--                        size="72px"-->
              <!--                        style="border: 2px solid #c0c0c0"-->
              <!--                      >-->
              <q-img
                :src="avatar"
                fit="contain"
                style="
                          width: 64px;
                          height: 64px;
                          border: 2px solid #c0c0c0;
                          border-radius: 8px;
                        "
              />
              <!--                      </q-avatar>-->
            </div>
            <div>
              <q-chip
                :label="user && user.username ? user.username: ''"
                class="text-uppercase text-bold shadow-2"
                color="warning"
                size="sm"
                text-color="negative"
              />
            </div>
            <div>
              {{
                user &&
                user?.full_name &&
                typeof user?.full_name === "string"
                  ? user?.full_name
                  : "!"
              }}
            </div>
            <!--                    <div v-if="roles">-->
            <!--                      <q-chip-->
            <!--                        v-for="(r, index) in roles"-->
            <!--                        :key="index"-->
            <!--                        :label="r"-->
            <!--                        class="text-uppercase text-bold"-->
            <!--                        color="warning"-->
            <!--                        size="sm"-->
            <!--                        text-color="text-dark"-->
            <!--                      />-->
            <!--                    </div>-->
          </div>
          <q-separator></q-separator>

          <q-list
            class="q-mt-xs q-gutter q-gutter-y-xs"
            dense
            style="max-width: 200px"
          >
            <q-item
              v-ripple
              class="text-uppercase text-white bg-positive shadow-1"
              clickable
              style="border-radius: 15px; max-height: 32px"
              to="/me"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="mdi-badge-account-horizontal-outline"
                ></q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("myaccount") }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              v-ripple
              class="bg-negative text-white text-uppercase shadow-1 q-pa-none"
              clickable
              dense
              style="border-radius: 15px; max-height: 32px"
              @click="handleLogout()"
            >
              <q-item-section avatar>
                <q-avatar icon="exit_to_app"></q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("labels.exit") }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </template>
  </q-btn-dropdown>


  <!-- Fin menu usuario -->
</template>

<style scoped lang="scss">

</style>
