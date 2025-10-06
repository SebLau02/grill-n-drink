import FlexBox from "@/components/ui/flexBox";
import PageView from "@/components/ui/pageView";
import Paper from "@/components/ui/paper";
import Select from "@/components/ui/select";
import { useState } from "react";

export default function HomeScreen() {
  const [formData, setFormData] = useState<{ [key: string]: string | number }>(
    {}
  );

  return (
    <PageView>
      <FlexBox
        direction="column"
        gap={2}
        sx={{
          width: "100%",
        }}
      >
        <Paper
          variant="outlined"
          style={{
            padding: 16,
          }}
        >
          <Select
            label="Age"
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ]}
            value={formData.select}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, select: val }))
            }
          />
        </Paper>

        <Select
          label="Age"
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
          value={formData.select}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              select: prev.select === val ? "" : val,
            }))
          }
        />
        <Select
          label="Age"
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
          value={formData.select}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              select: prev.select === val ? "" : val,
            }))
          }
        />
        <Select
          label="Age"
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
          value={formData.select}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              select: prev.select === val ? "" : val,
            }))
          }
        />
        <Select
          label="Age"
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
          value={formData.select}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              select: prev.select === val ? "" : val,
            }))
          }
        />
        <Select
          label="Age"
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
          value={formData.select}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              select: prev.select === val ? "" : val,
            }))
          }
        />
        <Select
          label="Age"
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
          value={formData.select}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              select: prev.select === val ? "" : val,
            }))
          }
        />
        <Select
          label="Age"
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
          value={formData.select}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              select: prev.select === val ? "" : val,
            }))
          }
        />
        <Select
          label="Age"
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
          value={formData.select}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              select: prev.select === val ? "" : val,
            }))
          }
        />
        <Select
          label="Age"
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
          value={formData.select}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              select: prev.select === val ? "" : val,
            }))
          }
        />
        <Select
          label="Age"
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
          value={formData.select}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              select: prev.select === val ? "" : val,
            }))
          }
        />
        <Select
          label="Age"
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
          value={formData.select}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              select: prev.select === val ? "" : val,
            }))
          }
        />
        <Select
          label="Age"
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
          value={formData.select}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              select: prev.select === val ? "" : val,
            }))
          }
        />
        <Select
          label="Age"
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
          value={formData.select}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              select: prev.select === val ? "" : val,
            }))
          }
        />
      </FlexBox>
    </PageView>
  );
}
