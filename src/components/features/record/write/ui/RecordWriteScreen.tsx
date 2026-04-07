import BackButton from "@/components/commons/backButton/BackButton";

import {
  RecordEditorBottomBar,
  RecordEditorForm,
} from "@/components/features/record";
import RecordWriteTop from "./RecordWriteTop";
import RecordWriteActions from "./RecordWriteActions";
import useRecordWriteSubmit from "../hooks/useRecordWriteSubmit";
import { useRecordEditorForm } from "../../editor/hooks/useRecordEditorForm";

export default function RecordWriteScreen() {
  const formId = "record-write-form";

  const { onSubmitValid, isBusy } = useRecordWriteSubmit();

  // TODO: 임시 저장 기능 구현
  const onTempSave = () => {
    console.log("temp save");
  };

  const { form, ...editorProps } = useRecordEditorForm(onSubmitValid);

  const disabled = isBusy || form.formState.isSubmitting;

  return (
    <div className="min-h-screen bg-background ">
      <BackButton fallbackHref="/records" label="뒤로가기" />
      {/* ✅ 버튼 바에 가리지 않게 pb 확보 */}
      <div className="max-w-lg mx-auto space-y-2 px-5 lg:space-y-6 lg:pb-28">
        <RecordWriteTop />
        <RecordEditorForm formId={formId} form={form} {...editorProps} />
      </div>

      <RecordEditorBottomBar>
        <RecordWriteActions
          formId={formId}
          disabled={disabled}
          onTempSave={onTempSave}
        />
      </RecordEditorBottomBar>
    </div>
  );
}
