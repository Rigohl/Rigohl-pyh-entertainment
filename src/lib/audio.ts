
import wav from 'wav';

/**
 * Converts a PCM audio buffer to a Base64 encoded WAV data string.
 * @param pcmData The raw PCM audio data.
 * @param channels Number of channels.
 * @param rate Sample rate.
 * @param sampleWidth Sample width in bytes.
 * @returns A promise that resolves to the Base64 encoded WAV string.
 */
export async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
