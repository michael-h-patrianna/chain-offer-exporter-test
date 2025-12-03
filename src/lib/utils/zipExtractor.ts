import JSZip from 'jszip';
import { ChainOfferExport, ExtractedAssets } from '../types';

/**
 * Revokes all object URLs in the extracted assets to prevent memory leaks.
 */
export function revokeChainOfferAssets(assets: ExtractedAssets): void {
  if (assets.backgroundImage) {
    URL.revokeObjectURL(assets.backgroundImage);
  }

  Object.values(assets.offerImages).forEach((states) => {
    Object.values(states).forEach((url) => {
      if (url) URL.revokeObjectURL(url);
    });
  });

  if (assets.headerImages) {
    Object.values(assets.headerImages).forEach((url) => {
      if (url) URL.revokeObjectURL(url);
    });
  }

  Object.values(assets.buttonIcons).forEach((states) => {
    Object.values(states).forEach((url) => {
      if (url) URL.revokeObjectURL(url);
    });
  });
}

export async function extractChainOfferZip(zipFile: File): Promise<ExtractedAssets> {
  const zip = new JSZip();
  const zipContent = await zip.loadAsync(zipFile);

  // Debug: Log all files in the ZIP
  console.log('Files in ZIP:', Object.keys(zipContent.files));

  // Extract positions file (check for positions_full.json first, then fall back to positions.json)
  let dataFile = zipContent.file('positions_full.json');
  if (!dataFile) {
    dataFile = zipContent.file('positions.json');
  }

  if (!dataFile) {
    throw new Error(
      'No positions_full.json or positions.json file found in ZIP. Available files: ' +
        Object.keys(zipContent.files).join(', ')
    );
  }

  const dataContent = await dataFile.async('string');
  const chainOfferData: ChainOfferExport = JSON.parse(dataContent);

  // Helper to extract image blob URL
  const extractImage = async (filename: string | undefined): Promise<string | undefined> => {
    if (!filename) return undefined;
    const file = zipContent.file(filename);
    if (file) {
      const blob = await file.async('blob');
      return URL.createObjectURL(blob);
    }
    console.warn(`Missing image: ${filename}`);
    return undefined;
  };

  // Extract background image
  let backgroundImage: string | undefined;
  if (chainOfferData.background?.exportUrl) {
    backgroundImage = await extractImage(chainOfferData.background.exportUrl);
    if (backgroundImage) console.log('Found background image:', chainOfferData.background.exportUrl);
  }

  // Extract offer images in parallel
  const offerImages: ExtractedAssets['offerImages'] = {};
  
  await Promise.all(
    chainOfferData.offers.map(async (offer) => {
      offerImages[offer.offerKey] = {};
      
      const imageStates = [
        { state: 'Locked', filename: offer.lockedImg },
        { state: 'Unlocked', filename: offer.unlockedImg },
        { state: 'Claimed', filename: offer.claimedImg },
      ] as const;

      await Promise.all(
        imageStates.map(async ({ state, filename }) => {
          if (filename) {
            const url = await extractImage(filename);
            if (url) {
              offerImages[offer.offerKey][state] = url;
              console.log(`Found offer image: ${offer.offerKey} ${state} -> ${filename}`);
            }
          }
        })
      );
    })
  );

  // Extract header images
  let headerImages: ExtractedAssets['headerImages'];
  if (chainOfferData.header) {
    headerImages = {};
    const headerStates = [
      { state: 'active', filename: chainOfferData.header.activeImg },
      { state: 'success', filename: chainOfferData.header.successImg },
      { state: 'fail', filename: chainOfferData.header.failImg },
    ] as const;

    await Promise.all(
      headerStates.map(async ({ state, filename }) => {
        const url = await extractImage(filename);
        if (url) {
          headerImages![state] = url;
          console.log(`Found header image: ${state} -> ${filename}`);
        }
      })
    );
  }

  // Extract button icons
  const buttonIcons: ExtractedAssets['buttonIcons'] = {};

  if (chainOfferData.buttons) {
    await Promise.all(
      chainOfferData.buttons.map(async (button) => {
        buttonIcons[button.offerKey] = {};

        if (button.icons) {
          const iconStates = [
            { state: 'default', icon: button.icons.default },
            { state: 'disabled', icon: button.icons.disabled },
            { state: 'hover', icon: button.icons.hover },
            // active state might not have an icon usually, but if it does, add here
          ] as const;

          await Promise.all(
            iconStates.map(async ({ state, icon }) => {
              if (icon?.img) {
                const url = await extractImage(icon.img);
                if (url) {
                  // @ts-ignore - we know state is a valid key
                  buttonIcons[button.offerKey][state] = url;
                  console.log(`Found button icon: ${button.offerKey} ${state} -> ${icon.img}`);
                }
              }
            })
          );
        }
      })
    );
  }

  console.log('Extraction complete:', {
    chainOfferData,
    offerImages,
    headerImages,
    buttonIcons,
    backgroundImage: !!backgroundImage,
  });

  return {
    chainOfferData,
    backgroundImage,
    offerImages,
    headerImages,
    buttonIcons,
  };
}
