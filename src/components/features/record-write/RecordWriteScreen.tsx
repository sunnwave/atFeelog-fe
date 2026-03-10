// RecordWriteScreen.tsx
import RecordWriteForm from "./recordWriteForm/RecordWriteForm";
import RecordWriteTop from "./recordWriteForm/RecordWriteTop";
import RecordWriteSubmitButtons from "./RecordWriteSubmitButtons";
import { RecordWriteFormValues } from "./recordWriteForm/types";
import BackButton from "@/components/commons/backButton/BackButton";

export default function RecordWriteScreen() {
  const formId = "record-write-form";

  const onSubmitValid = async (values: RecordWriteFormValues) => {
    console.log("submit", values);
  };

  const onTempSave = () => {
    console.log("temp save");
  };

  return (
    <div className="min-h-screen bg-background ">
      <BackButton fallbackHref="/records" label="뒤로가기" />
      {/* ✅ 버튼 바에 가리지 않게 pb 확보 */}
      <div className="max-w-lg mx-auto space-y-2 px-5 lg:space-y-6 lg:pb-28">
        <RecordWriteTop />
        <RecordWriteForm formId={formId} onSubmitValid={onSubmitValid} />
      </div>

      <RecordWriteSubmitButtons formId={formId} onTempSave={onTempSave} />
    </div>
  );
}
