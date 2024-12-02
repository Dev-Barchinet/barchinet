import { useState } from "react";

export const useFileDownloader = (
    fileAccessToken2: string,
    accessToken: string
) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const fileAccessToken = "JT+z3kODuWQwILDLiufryKcD1R+mp3ZKECCa6Q4eEIwxaGsSJUw0x6CJBSxpNSWyW8VvBnX1Pi1Q3ub/khmjkk002rL9k2u9lnSWE/JMFYg="

    const downloadFile = async (fileUrl: string, fileName: string) => {
        try {
            setIsDownloading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_GATEWAY}${fileUrl}?token=${encodeURIComponent(fileAccessToken)}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            console.log(response)

            if (!response.ok) {
                throw new Error("Failed to download file");
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        } finally {
            setIsDownloading(false);
        }
    };

    const getFileLink = (fileUrl: string) => {
        return `${
            process.env.NEXT_PUBLIC_GATEWAY
        }${fileUrl}?token=${encodeURIComponent(fileAccessToken)}`;
    };

    return { downloadFile, getFileLink, isDownloading };
};
