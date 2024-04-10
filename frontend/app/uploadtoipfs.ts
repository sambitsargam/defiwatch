import { ApplicationAccessTokenService, FleekSdk } from "@fleekxyz/sdk";

const applicationService = new ApplicationAccessTokenService({
  clientId: process.env.NEXT_PUBLIC_FLEEK_APPLICATION_ID || "",
});

const fleekSdk = new FleekSdk({ accessTokenService: applicationService });

type IpfsFile = {
  path: string;
  content?: Buffer;
};

type UploadResult = {
  cid: string; // Adjust CID type if needed
  size: number;
  path: string;
};

type AddAllOptions = {
  wrapWithDirectory?: boolean;
};

type AddFromPathOptions = {
  wrapWithDirectory?: boolean;
};

const uploadToIPFS = async (filename: string, content: Buffer) => {
  const result = await fleekSdk.ipfs().add({
    path: filename,
    content: content,
  });
  return result;
};

const uploadMultipleToIPFS = async (files: IpfsFile[]) => {
  const result = await fleekSdk.ipfs().addAll(files);
  return result;
};

const uploadFromPathToIPFS = async (filePath: string) => {
  const result = await fleekSdk.ipfs().addFromPath(filePath);
  return result;
};

export { uploadToIPFS, uploadMultipleToIPFS, uploadFromPathToIPFS };
