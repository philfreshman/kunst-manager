<script setup lang="ts">
import limitTextarea from "~/utils/textareaLimiter"
import { offersModalTabs } from "~/utils/tableDefinitions"
import useSnapshot from "~/composables/useSnapshot"
import { formatArtwork } from "~/utils/formater"
import type { PropType } from "@vue/runtime-core"

const emit = defineEmits<{ closeModal: [] }>()
const props = defineProps({
  editOffer: {
    type: Object as PropType<Offer>,
    required: true,
    default: defaultOffer()
  }
})

// Data
const artworks = useArtworks("search")
const snap = useSnapshot()
// const selected = ref([] as string[])
const selected = ref(["Y2MwOGViNjQ", "ZDgwYzczOTI", "MWIzZjMzNGE"])
const maxLength = 7
watch(selected, (newVal) => {
  if (newVal.length > maxLength) {
    selected.value = newVal.slice(0, maxLength)
  }
})

// Modal
const tabIndex = ref(0)

const formData = reactive<Offer>(props.editOffer)

const removeSelected = (artIndex: string) => {
  selected.value = selected.value.filter((item) => item !== artIndex)
}

const artworkById = (id: string) => {
  return artworks.data.value && artworks.data.value.find((artwork) => artwork.id === id)
}

const tabChange = async (idx: number) => {
  tabIndex.value = idx
  if (tabIndex.value == 2) {
    await snap.initCollection(selected.value)
    snap.calcRentPrices(formData, "offer")
  }
}

const submitOffer = async () => {
  if (!snap.snapshot.value) return
  try {
    const { data: snapshotId } = await snap.createSnapshot({ ...snap.snapshot.value, snapshot_type: "offer" })
    await useOffers().createOffer({ ...formData, snapshot_id: snapshotId })
    emit("closeModal")
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  // mute nuxt ui bug warnings
  console.warn = () => {}

  // snap.getSnapshotById(props.editOffer.snapshot_id).then((res) => {
  //   console.log(res)
  // })
})
</script>

<template>
  <BaseModal :isWide="tabIndex !== 0">
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold">Angebot erstellen</h2>
        <UButton
          @click="emit('closeModal')"
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
        />
      </div>
    </template>

    <div>
      <UTabs :items="offersModalTabs" class="h-[464px] w-full custom-height flex flex-col" @change="tabChange">
        <template #data="{ item }">
          <UCard>
            <UForm :state="formData" class="label-padding">
              <UFormGroup label="Anschrift" class="label-no-padding">
                <UTextarea v-model="formData.address" :rows="4" type="text" @input="limitTextarea" />
              </UFormGroup>
              <UFormGroup label="Production">
                <UInput v-model="formData.production_name" type="text" />
              </UFormGroup>
              <UFormGroup label="Set">
                <UInput v-model="formData.set_name" type="text" />
              </UFormGroup>
              <div class="w-full flex flex-row">
                <UFormGroup label="Leih-Zeitraum" class="w-[47%]">
                  <UInput v-model="formData.start_date" type="date" />
                </UFormGroup>
                <div class="w-[6%] flex justify-end flex-col">
                  <h1 class="pl-1 pb-1">-></h1>
                </div>
                <UFormGroup label="&nbsp" class="w-[47%]">
                  <UInput v-model="formData.end_date" type="date" />
                </UFormGroup>
              </div>
              <div class="w-[47%]">
                <UFormGroup label="Rechnungsdatum">
                  <UInput v-model="formData.offer_date" type="date" />
                </UFormGroup>
              </div>
            </UForm>
          </UCard>
        </template>

        <template #artworks="{ item }" class="h-full">
          <div class="h-full">
            <UCard class="w-full h-full">
              <USelectMenu
                placeholder="Suche Kunstwerke..."
                icon="i-heroicons-magnifying-glass-20-solid"
                v-model="selected"
                multiple
                searchable
                :options="artworks.data.value"
                value-attribute="id"
                option-attribute="id"
                :search-attributes="['name', 'article_id', 'title']"
              >
                <template #option="{ option: artwork }">
                  <code>{{ formatArtwork(artwork) }}</code>
                </template>
              </USelectMenu>
              <br />

              <div class="w-full h-full overflow-scroll">
                <ul class="h-[310px]">
                  <li v-for="(val, key) in selected" :key="item">
                    <div
                      class="flex justify-between mb-2 px-3 rounded-md ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 p-1"
                    >
                      <LazyUTooltip :openDelay="1000" :ui="{ base: 'h-auto', width: 'max-w-2xl' }">
                        <template #text>
                          <img class="h-96" :src="artworkById(val).url" alt="artwork" />
                          <span class="w-full flex flex-row justify-center items-center h-4">
                            <span class="italic">{{ artworkById(val).title }}</span>
                          </span>
                        </template>
                        <div class="w-[536px] whitespace-nowrap overflow-ellipsis overflow-hidden pr-3">
                          <code class="">{{ `${key + 1} ${formatArtwork(artworkById(val))}` }}</code>
                        </div>
                      </LazyUTooltip>

                      <UIcon
                        class="mt-1 hover:cursor-pointer"
                        dynamic
                        @click="removeSelected(val)"
                        color="gray"
                        variant="link"
                        name="i-heroicons-x-mark-20-solid"
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </UCard>
          </div>
        </template>

        <template #summary="{ item }">
          <UCard class="w-full h-full overflow-scroll">
            <DocumentSummaryAccordion :snapshot="snap.snapshot.value" :formData />
          </UCard>
        </template>
      </UTabs>
    </div>

    <template #footer>
      <div class="w-full flex justify-center">
        <UButton @click="submitOffer">Save</UButton>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="sass">
.custom-height>div:nth-child(2)
    flex: 1
    height: 100%

div[tabindex="-1"]
  height: 100% !important

code
  overflow: hidden
  max-width: 100%
  text-overflow: ellipsis
  width: fit-content
  white-space: nowrap
</style>