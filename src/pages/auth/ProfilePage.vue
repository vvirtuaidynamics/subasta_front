<template>
  <q-page class="">
    <q-card class="q-pa-sm no-shadow no-border">
      <q-card-section class="text-h6 ">
        <!--        <div class="text-h6">Edit Profile</div>-->
        <!--        <div class="text-subtitle2">Complete your profile</div>-->
      </q-card-section>
      <q-card-section class="text-h6">
        <q-list class="row full-width">
          <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-item-section class="flex flex-center">
              <avatar-field :model-value="avatar" :editable="editing"></avatar-field>
            </q-item-section>
          </q-item>
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <text-field name="username" :label="$t('fields.username')" :readonly="true"
                          :model-value="formData.username"
                          @update="(val)=>formData.username=val"></text-field>
            </q-item-section>
          </q-item>
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <text-field name="name" :label="$t('fields.name')" :model-value="formData.name"
                          @update="(val)=>formData.name=val"></text-field>
            </q-item-section>
          </q-item>
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <text-field name="surname" :label="$t('fields.surname')" :model-value="formData.surname"
                          @update="(val)=>formData.surname=val"></text-field>
            </q-item-section>
          </q-item>
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <text-field name="email" :label="$t('fields.email')" :model-value="formData.email"
                          @update="(val)=>formData.email=val"></text-field>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section action>

      </q-card-section>

    </q-card>

  </q-page>
</template>

<script setup>
import {useApp} from "src/composables/useApp";
import {$t} from "src/services/i18n"
import AvatarField from "components/base/form/AvatarField.vue";
import {onBeforeMount, ref} from "vue";
import TextField from "components/base/form/TextField.vue";

defineOptions({
  name: 'ProfilePage'
});
const editing = ref(false)
const {user} = useApp();
const avatar = ref();

const formData = ref({});


onBeforeMount(() => {
  avatar.value = user.avatar; // Assuming user has avatar property
  formData.value = {...user.value}; // Assuming user has avatar property

})

</script>
