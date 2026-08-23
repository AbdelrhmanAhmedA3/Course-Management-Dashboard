import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import type { PrimeNGConfigType } from 'primeng/config';

const preset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          '50': '#E6EEF3',
          '100': '#CCDDE7',
          '200': '#99BBCF',
          '300': '#6699B7',
          '400': '#33779F',
          '500': '#003462',
          '600': '#002E58',
          '700': '#00274E',
          '800': '#002044',
          '900': '#001A3A', // Darkest shade
        },
        surface: {

        },
        formField: {

        },
      },
    },
  },
  components: {
    button: {
      colorScheme: {
      },
    },
    tooltip: {
      root: {
      },
    },
    tabs: {
      tablist: {
      },
      tab: {
      },
      activeBar: {
      },

    },
    card: {
      body: {},
    },
    select: {

    },
    multiselect: {

    },
  },
});



export const AppTheme: PrimeNGConfigType = {
  translation: {
    dateFormat: 'dd-mm-yy',
  },
  theme: {
    preset: preset,
    options: {
      cssLayer: {
        name: 'primeng',
        order: 'tailwind, primeng, app',
      },
      darkModeSelector: false,
    },
  },
};