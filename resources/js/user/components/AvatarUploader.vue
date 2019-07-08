<template>
  <v-hover>
    <v-avatar
      slot-scope="{ hover }"
      :size="130"
      color="elevation-3"
      class="overflow-hidden"
    >
      <transition name="fade-transition">
        <div v-show="hover && !uploadable_uploading" class="camera-overlay overlay--dark">
          <v-flex shrink>
            <uploader
              :end-point="endpoint"
              :multipart="multipart"
              :multiple="false"
              accept="image/*"
              :show-errors="false"
              @startUpload="onStartUpload"
              @chunkUploaded="onChunkUploaded"
              @fileUploaded="onFileUploaded"
              @error="onUploadError"
            >
              <template slot="browse-btn">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon dark v-on="on">camera</v-icon>
                  </template>
                  <span>Upload files</span>
                </v-tooltip>
              </template>
            </uploader>
          </v-flex>
        </div>
      </transition>

      <transition name="fade-transition" mode="out-in">
        <v-progress-circular
          v-if="uploadable_uploading"
          :indeterminate="$_uploadable_isIndeterminate"
          v-bind="$_uploadable_progressAdditionalProps"
          color="accent"
          class="avatar-progress"
        ></v-progress-circular>

        <!-- <img v-if="uploadableAvatar.length" :src="`${uploadableAvatar}`" /> -->
      </transition>

      <transition name="fade-transition" mode="out-in">
        <!-- <v-progress-circular
          v-if="uploadable_uploading"
          :indeterminate="$_uploadable_isIndeterminate"
          v-bind="$_uploadable_progressAdditionalProps"
          color="accent"
        ></v-progress-circular> -->

        <img v-if="!uploadable_uploading && uploadableAvatar.length" :src="`${uploadableAvatar}`" />
      </transition>
    </v-avatar>
  </v-hover>
</template>

<script>
import uploadable from "../../mixins/uploadable";

export default {
  mixins: [uploadable]
};
</script>

<style lang="scss" scoped>
.camera-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(82, 82, 82, 0.6);
}

.avatar-progress {
  position: absolute;
}
</style>
