import { useState } from "react";

export const useFileDownloader = (
    fileAccessToken2: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _accessToken: string
) => {
    const [isDownloading] = useState(false);

    const fileAccessToken = fileAccessToken2;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const downloadFile = async (fileUrl: string, _fileName: string) => {
        const url = `${process.env.NEXT_PUBLIC_GATEWAY}${fileUrl}?token=${fileAccessToken}`
        window.open(url, '_blank')
        // try {
        //     setIsDownloading(true);
        //     const response = await fetch(
        //         `${process.env.NEXT_PUBLIC_GATEWAY}${fileUrl}?token=${fileAccessToken}`,
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${accessToken}`,
        //             },
        //         }
        //     );

        //     if (!response.ok) {
        //         throw new Error("Failed to download file");
        //     }

        //     const blob = await response.blob();
        //     const url = URL.createObjectURL(blob);

        //     const a = document.createElement("a");
        //     a.href = url;
        //     a.download = fileName;
        //     document.body.appendChild(a);
        //     a.click();
        //     a.remove();

        //     URL.revokeObjectURL(url);
        // } catch (error) {
        //     console.error(error);
        // } finally {
        //     setIsDownloading(false);
        // }
    };

    const getFileLink = (fileUrl: string) => {
        return `${process.env.NEXT_PUBLIC_GATEWAY}${fileUrl}?token=${fileAccessToken}`;
    };

    return { downloadFile, getFileLink, isDownloading };
};
