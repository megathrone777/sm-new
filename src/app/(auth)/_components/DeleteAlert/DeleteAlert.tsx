import React from "react";
import Form from "next/form";
import Link from "next/link";

import { Button } from "@/ui";

import {
  wrapperClass,
  confirmActionsClass,
  confirmClass,
  confirmTextClass,
} from "./DeleteAlert.css";

import type { TProps } from "./DeleteAlert.types";

const DeleteAlert: React.FC<TProps> = ({ action, deleteId, deleteTitle, href }) => (
  <div className={wrapperClass}>
    <div className={confirmClass}>
      <p className={confirmTextClass}>Delete &ldquo;{deleteTitle ?? deleteId}&rdquo;?</p>

      <div className={confirmActionsClass}>
        <Form {...{ action }}>
          <input
            name="id"
            type="hidden"
            value={`${deleteId}`}
          />

          <input
            name="title"
            type="hidden"
            value={`${deleteTitle ?? deleteId}`}
          />

          <Button
            template="small"
            type="submit"
          >
            Delete
          </Button>
        </Form>

        <Link
          {...{ href }}
          scroll={false}
        >
          <Button template="small">Cancel</Button>
        </Link>
      </div>
    </div>
  </div>
);

export { DeleteAlert };
