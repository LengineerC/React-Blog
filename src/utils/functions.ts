/**
 * Copy text content
 * @param text The content to copy
 * @returns {Promise<boolean>}
 */
export const copyText = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);

      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;

      textArea.style.position = 'fixed';
      textArea.style.top = '-9999px';
      textArea.style.left = '-9999px';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          return true;
        } else {
          throw new Error('复制失败');
        }
      } catch (err) {
        console.log('复制失败', err);

        return false;
      } finally {
        document.body.removeChild(textArea);
      }
    }
  } catch (e) {
    console.log('复制失败', e);
    return false;
  }
};
