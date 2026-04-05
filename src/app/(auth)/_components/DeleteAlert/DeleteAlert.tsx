"use client";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/ui";

import {
  wrapperClass,
  confirmActionsClass,
  confirmClass,
  confirmTextClass,
} from "./DeleteAlert.css";

import type { TProps } from "./DeleteAlert.types";

const DeleteAlert: React.FC<TProps> = ({ action, deleteId, deleteTitle, href }) => {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, null);

  useEffect((): void => {
    if (!state) return;
    const { message, type } = state;

    toast(message, { type });

    if (type === "success") {
      router.push("/admin/products");
    }
  }, [state]);

  return (
    <div className={wrapperClass}>
      <div className={confirmClass}>
        <p className={confirmTextClass}>Delete &ldquo;{deleteTitle ?? deleteId}&rdquo;?</p>

        <div className={confirmActionsClass}>
          <Form action={formAction}>
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
              disabled={pending}
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
};

export { DeleteAlert };
