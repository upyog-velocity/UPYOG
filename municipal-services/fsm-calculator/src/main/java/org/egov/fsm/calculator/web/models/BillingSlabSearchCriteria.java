package org.egov.fsm.calculator.web.models;

import java.util.List;

import org.egov.fsm.calculator.web.models.BillingSlab.SlumEnum;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BillingSlabSearchCriteria {

	@JsonProperty("offset")
	private Integer offset;

	@JsonProperty("limit")
	private Integer limit;

	@JsonProperty("tenantId")
	private String tenantId;

	@JsonProperty("ids")
	private List<String> ids;

	@JsonProperty("propertyType")
	private String propertyType;

	@JsonProperty("capacity")
	private Double capacity;

	@JsonProperty("sortBy")
	private SortBy sortBy;

	@JsonProperty("sortOrder")
	private SortOrder sortOrder;

	@JsonProperty("slum")
	private SlumEnum slum;

	@JsonProperty("ward")
	private String ward;

	public enum SortOrder {
		ASC, DESC
	}

	public enum SortBy {
		ID, PROPERTYTYPE, CAPACITY
	}

	public boolean isEmpty() {
		return (this.tenantId == null && this.offset == null && this.limit == null
				&& !StringUtils.hasText(this.propertyType) && CollectionUtils.isEmpty(this.ids)
				&& this.capacity == null);
	}

	public boolean tenantIdOnly() {
		return (this.tenantId != null && this.offset == null && this.limit == null
				&& !StringUtils.hasText(this.propertyType) && CollectionUtils.isEmpty(this.ids)
				&& this.capacity == null);
	}
}
