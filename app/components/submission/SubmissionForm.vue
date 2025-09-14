<script setup lang="ts">
import * as v from 'valibot';
import type { FormSubmitEvent } from '@nuxt/ui';
import IconLink from "~/components/icon/IconLink.vue";
import IconStar from "~/components/icon/IconStar.vue";
import IconUser from "~/components/icon/IconUser.vue";
import IconLines from "~/components/icon/IconLines.vue";
import IconImage from "~/components/icon/IconImage.vue";
import IconVideo from "~/components/icon/IconVideo.vue";
import IconPaperclip from "~/components/icon/IconPaperclip.vue";
import SubmissionInput from "~/components/submission/SubmissionInput.vue";
import SubmissionTextarea from "~/components/submission/SubmissionTextarea.vue";
import SubmissionLinksInput from "~/components/submission/SubmissionLinksInput.vue";
import SubmissionSingleFile from "~/components/submission/SubmissionSingleFile.vue";
import SubmissionMultipleFile from "~/components/submission/SubmissionMultipleFile.vue";

import type { IdeaFormData } from '~/types';

const emit = defineEmits<{
  submit: [formData: IdeaFormData];
}>();

// Create Valibot validation schema
const schema = v.object({
  authorName: v.optional(v.string()),
  name: v.pipe(
    v.string(),
    v.minLength(1, 'Project name is required'),
    v.transform(s => s.trim())
  ),
  tagline: v.pipe(
    v.string(),
    v.minLength(1, 'Tagline is required'),
    v.maxLength(60, 'Tagline must be 60 characters or less'),
    v.transform(s => s.trim())
  ),
  tags: v.optional(v.string()),
  description: v.optional(v.string()),
  links: v.optional(v.string()),
  thumbnail: v.optional(v.nullable(v.any())),
  gallery: v.optional(v.array(v.any())),
  videoLink: v.optional(
    v.union([
      v.literal(''),
      v.pipe(
        v.string(),
        v.regex(/^https?:\/\/.+/, 'Please enter a valid URL starting with http:// or https://')
      )
    ])
  )
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive<IdeaFormData>({
  authorName: '',
  name: '',
  tagline: '',
  tags: '',
  description: '',
  links: '',
  thumbnail: null,
  gallery: [],
  videoLink: ''
});

const formRef = ref();

const onSubmit = async (_event: FormSubmitEvent<Schema>) => {
  // Validate links if they exist
  if (state.links) {
    const links = state.links.split('\n').filter(link => link.trim());
    const urlPattern = /^https?:\/\/.+/;
    for (const link of links) {
      if (!urlPattern.test(link.trim())) {
        // Set error on the form
        formRef.value?.setErrors([{
          path: 'links',
          message: 'Please enter valid URLs starting with http:// or https://'
        }]);
        return;
      }
    }
  }

  emit('submit', state);
};

const submitForm = async () => {
  // Trigger form submission programmatically
  formRef.value?.submit();
};

defineExpose({
  submitForm
});
</script>

<template>
  <UForm
    ref="formRef"
    :schema="schema"
    :state="state"
    class="p-6 space-y-6"
    @submit="onSubmit"
  >
    <SubmissionInput
      v-model="state.authorName"
      name="authorName"
      label="USER_ID"
      :icon="IconUser"
      icon-color="blue"
      hint="Optional"
      placeholder="ENTER_USER_IDENTIFIER"
    />

    <SubmissionInput
      v-model="state.name"
      name="name"
      label="IDEA_NAME"
      :icon="IconStar"
      icon-color="pink"
      :required="true"
      placeholder="CROSS_CHAIN_NFT_MARKETPLACE"
    />

    <SubmissionInput
      v-model="state.tagline"
      name="tagline"
      label="TAGLINE"
      :icon="IconLines"
      icon-color="blue"
      :required="true"
      placeholder="SHORT_CATCHY_DESCRIPTION"
      :maxlength="60"
    />

    <SubmissionInput
      v-model="state.tags"
      name="tags"
      label="TAGS"
      :icon="IconStar"
      icon-color="purple"
      hint="SEPARATE WITH COMMAS"
      placeholder="DEFI, CROSS_CHAIN, SDK (SEPARATE_WITH_COMMAS)"
    />

    <SubmissionTextarea
      v-model="state.description"
      name="description"
      label="DESCRIPTION"
      :icon="IconLines"
      icon-color="green"
      :required="false"
      hint="OPTIONAL"
      placeholder="DESCRIBE_INNOVATION_PROTOCOL_AND_IMPLEMENTATION_STRATEGY"
      :rows="4"
    />

    <SubmissionLinksInput
      v-model="state.links"
      name="links"
      label="REFERENCE_LINKS"
      :icon="IconLink"
      icon-color="blue"
      hint="SIMILAR/DOC"
      placeholder="HTTPS://DOCUMENTATION_LINK"
    />

    <SubmissionSingleFile
      v-model="state.thumbnail"
      name="thumbnail"
      label="ICON"
      :icon="IconImage"
      icon-color="purple"
      accept="image/*"
      button-text="SELECT"
      help-text="MAX_SIZE_5MB"
      file-icon="🖼️"
    />

    <SubmissionInput
      v-model="state.videoLink"
      name="videoLink"
      label="VIDEO_LINK"
      :icon="IconVideo"
      icon-color="green"
      hint="OPTIONAL"
      type="url"
      placeholder="HTTPS://ANY_VIDEO_PLATFORM.COM/SHARE"
    />

    <SubmissionMultipleFile
      v-model="state.gallery"
      name="gallery"
      label="GALLERY_ATTACHMENTS"
      :icon="IconPaperclip"
      icon-color="purple"
      accept="image/*"
      button-text="SELECT_IMAGES"
      help-text="MAX_TOTAL_SIZE_10MB"
    />
  </UForm>
</template>
