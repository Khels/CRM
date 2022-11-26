import enum

from fastapi import UploadFile


class Sex(enum.Enum):
    male = 1
    female = 2


class FileParser:
    def __init__(self, cv: UploadFile):
        self.file = cv
        self.file_extension = cv.content_type.split("/")[1]

    async def _parse_word(self):
        pass

    async def get_candidate(self):
        print(self.file_extension)
        match self.file_extension:
            case "doc" | "docx" | "msword":
                await self._parse_word()
