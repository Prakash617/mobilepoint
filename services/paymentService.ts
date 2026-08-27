import { api } from "@/lib/api";

export interface EsewaInitiateResponse {
  payment_id: number;
  transaction_uuid: string;
  form_url: string;
  form_data: Record<string, string>;
}

export interface EsewaStatusResponse {
  pid?: string;
  scd?: string;
  totalAmount?: number;
  status: string;
  refId?: string | null;
}

export const paymentService = {
  initiateEsewa: async (payload: {
    order_id?: number;
    amount: number;
    tax_amount?: number;
    service_charge?: number;
    delivery_charge?: number;
    success_url: string;
    failure_url: string;
  }): Promise<EsewaInitiateResponse> => {
    const { data } = await api.post<EsewaInitiateResponse>(
      "/payment/esewa/initiate/",
      payload
    );
    return data;
  },

  checkEsewaStatus: async (params: {
    transaction_uuid: string;
    total_amount: number;
    product_code?: string;
  }): Promise<EsewaStatusResponse> => {
    const { data } = await api.get<EsewaStatusResponse>(
      "/payment/esewa/status/",
      { params }
    );
    return data;
  },

  verifyEsewaSuccess: async (dataParam: string): Promise<unknown> => {
    const { data } = await api.get(`/payment/esewa/success/redirect/?data=${dataParam}`);
    return data;
  },

  verifyEsewaFailure: async (dataParam: string): Promise<unknown> => {
    const { data } = await api.get(`/payment/esewa/failure/redirect/?data=${dataParam}`);
    return data;
  },

  initiateKhalti: async (payload: {
    order_id?: number;
    amount: number;
    purchase_order_id: string;
    purchase_order_name: string;
    return_url: string;
    website_url: string;
  }): Promise<{ payment_id: number; transaction_uuid: string; pidx: string; payment_url: string }> => {
    const { data } = await api.post("/payment/khalti/initiate/", payload);
    return data;
  },

  verifyKhalti: async (pidx: string): Promise<unknown> => {
    const { data } = await api.post("/payment/khalti/verify/", { pidx });
    return data;
  },

  redirectToFesewa: (formUrl: string, formData: Record<string, string>) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = formUrl;

    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  },
};
