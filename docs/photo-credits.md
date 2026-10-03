# Photo and font credits

The existing local travel artwork is retained from the project's original visual draft. It is used as travel illustration, rather than a claim that a person pictured is Ananda or that a vehicle pictured belongs to him.

The following photos are listed as free to use under the [Unsplash License](https://unsplash.com/license). They are stored locally as compressed WebP files. Category photos illustrate an interest; the venue for each stop is agreed with the guest.

| File | Photographer | Source |
| --- | --- | --- |
| `lunch.webp` | Zoshua Colah | [Sri Lankan rice and curry](https://unsplash.com/photos/a-plate-of-rice-and-various-south-asian-dishes-_WQ1qARALg4) |
| `crafts.webp` | Dominik Scythe | [Woodcarving close-up](https://unsplash.com/photos/person-using-chisel-while-curving-wood-3cIvvzjE6Lk) |
| `herbs.webp` | Parnis Azimi | [Bowls of herbs and spices](https://unsplash.com/photos/a-table-topped-with-bowls-filled-with-different-types-of-spices-SychJcGUzOI) |
| `spa.webp` | Mediamodifier | [Towels, candles and scented oil](https://unsplash.com/photos/reed-diffuser-with-candles-and-towel-W7AyAs7azHc) |
| `heritage.webp` | Anthony Lim | [Traditional masks in Sri Lanka](https://unsplash.com/photos/a-wall-full-of-masks-hanging-on-a-wall-H-qDQSXBBBc) |

`scripts/prepare-photos.mjs` can recreate these assets from their source pages. `scripts/prepare-local-assets.mjs` compresses the existing travel artwork. The original PNGs remain available.

Fraunces and Inter are the same font families already used by the project. Their cached Latin font files are now bundled under `src/app/fonts` to avoid a build-time font download. Their official SIL Open Font License files are included beside the fonts, sourced from [Google Fonts Fraunces](https://github.com/google/fonts/tree/main/ofl/fraunces) and [Google Fonts Inter](https://github.com/google/fonts/tree/main/ofl/inter).
