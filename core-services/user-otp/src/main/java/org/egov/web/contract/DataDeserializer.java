package org.egov.web.contract;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.egov.web.contract.DataWrapper;

import java.io.IOException;

public class DataDeserializer extends JsonDeserializer<DataWrapper> {

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public DataWrapper deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        JsonNode rootNode = jsonParser.getCodec().readTree(jsonParser);
        JsonNode dataNode = rootNode.get("data");

        DataWrapper dataWrapper = new DataWrapper();
        if (dataNode.isArray()) {
            dataWrapper.setData(objectMapper.readValue(dataNode.toString(), Object[].class));
        } else if (dataNode.isObject()) {
            dataWrapper.setData(objectMapper.treeToValue(dataNode, Object.class));
        } else {
            dataWrapper.setData(null);  // Handle other cases if needed
        }

        return dataWrapper;
    }
}
